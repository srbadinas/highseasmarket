import { query } from "@utils/db";
import getUTCDateTime from "@utils/getUTCDateTime";
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {
        const { id: userId } = params;
        const [user] = await query('SELECT * FROM users WHERE id = ?', userId);

        return NextResponse.json(user);
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function POST(req) {
    try {
        const requestData = await req.json();
        const { created_at, id, password_hash, ...user } = requestData;

        user.updated_at = getUTCDateTime();
        const res = await query('UPDATE users SET ? WHERE id = ?', [user, id]);
        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await query('DELETE FROM product_requests WHERE requested_by_user_id = ?', id);
        await query('DELETE FROM user_licenses WHERE user_id = ?', id);
        const res = await query('DELETE FROM users WHERE id = ?', id);
        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message)
    }
}