import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const requestData = await req.json();
        const {licenses, ...user} = requestData

        user.user_role_id = 3; // buyer
        user.is_active = true;

        const res = await query(`INSERT INTO users SET ?`, user);
        let userId = res.insertId;

        [...licenses].map(async item => {
            const licenseResponse = await query(`INSERT INTO licenses (license, license_formatted) VALUES (?, ?)`, [item, item.replace(/ /g, '').toLowerCase()]);
            let licenseId = licenseResponse.insertId;
            const userLicenseResponse = await query(`INSERT INTO user_licenses (user_id, license_id) VALUES (?, ?)`, [userId, licenseId]);
        })

        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message);
    }
}