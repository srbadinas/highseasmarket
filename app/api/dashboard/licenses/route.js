import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        return NextResponse.json('success');
    } catch (err) {
        throw new Error(err);
    }
}