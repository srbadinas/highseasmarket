import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const licenses = await query(`SELECT l.license
        FROM user_licenses ul
        LEFT OUTER JOIN licenses l ON ul.license_id = l.id
        WHERE user_id = ?`, id);
        return NextResponse.json(licenses);
    } catch (err) {
        throw new Error(err);
    }
}