import { query } from "@utils/db";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const res = await query('SELECT * FROM listing_requests ORDER BY created_at DESC');
        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}

