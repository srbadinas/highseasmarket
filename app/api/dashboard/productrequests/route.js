import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const res = await query(`SELECT pr.*, 
        CONCAT(rb.firstname, ' ', rb.lastname) as requested_by_user, 
        CONCAT(rt.firstname, ' ', rt.lastname) as requested_to_user 
        FROM product_requests pr 
        LEFT JOIN users rb ON pr.requested_by_user_id = rb.id 
        LEFT JOIN users rt ON pr.requested_to_user_id = rt.id 
        ORDER BY pr.created_at DESC`);
        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}

export async function POST(req) {
    try {
        const productRequestData = await req.json();
        productRequestData.product_price = productRequestData.product_price.replace(/[^\d.]/g, "");
        productRequestData.price_per_unit = productRequestData.price_per_unit.replace(/[^\d.]/g, "");

        const res = await query('INSERT INTO product_requests SET ?', productRequestData);
        console.log(res);


        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}