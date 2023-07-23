import { query } from "@utils/db";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const requestData = await req.json();
        const res = await query('INSERT INTO chat_messages SET ?', requestData);
        return NextResponse.json('success');
    }
    catch (err) {
        throw new Error(err.message);
    }
}