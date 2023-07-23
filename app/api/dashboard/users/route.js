import { query } from "@utils/db";
import encryptPassword from "@utils/encryptPassword";
import generateRandomString from "@utils/generateRandomString";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const users = await query(`SELECT u.*, ur.user_role FROM users u
        LEFT JOIN user_roles ur ON u.user_role_id = ur.id
        ORDER BY created_at DESC`);
        return NextResponse.json(users);
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function POST(req) {
    try {
        const userData = await req.json();
        userData.set_new_password = true;
        userData.password_hash = await encryptPassword(generateRandomString());

        const res = await query('INSERT into users SET ?', userData);
        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message);
    }
}