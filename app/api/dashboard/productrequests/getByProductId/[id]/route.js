import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const res = await query(`SELECT pr.*, 
        CONCAT(rb.firstname, ' ', rb.lastname) as requested_by_user, 
        CONCAT(rt.firstname, ' ', rt.lastname) as requested_to_user 
        FROM product_requests pr 
        LEFT JOIN users rb ON pr.requested_by_user_id = rb.id 
        LEFT JOIN users rt ON pr.requested_to_user_id = rt.id 
        WHERE product_id = ?
        ORDER BY pr.created_at DESC`, id);

        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message);
    }
}