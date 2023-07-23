import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const listingRequestData = await req.json();
        listingRequestData.product_price = listingRequestData.product_price.replace(/[^\d.]/g, "");

        const res = await query('INSERT INTO listing_requests SET ?', listingRequestData);

        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}