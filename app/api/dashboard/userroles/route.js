import { query } from "@utils/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET (req) {
    try {
        const userRoles = await query('SELECT * FROM user_roles ORDER BY ID');
        return NextResponse.json(userRoles);
    } catch (err) {
        throw new Error(err.message);
    }
}