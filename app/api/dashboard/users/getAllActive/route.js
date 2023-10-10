import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const users = await query(`SELECT u.*, ur.user_role FROM users u
        LEFT JOIN user_roles ur ON u.user_role_id = ur.id
        AND u.is_active = 1
        ORDER BY created_at DESC
        LIMIT 5`);
        return NextResponse.json(users);
    } catch (err) {
        throw new Error(err.message);
    }
}