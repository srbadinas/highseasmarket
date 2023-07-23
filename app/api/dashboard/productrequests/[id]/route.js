import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const [productRequest] = await query(`SELECT pr.*, CONCAT(rb.firstname, ' ', rb.lastname) requested_by_user
        FROM product_requests pr
        LEFT OUTER JOIN users rb ON pr.requested_by_user_id = rb.id
        WHERE pr.id = ?`, id);
        return NextResponse.json(productRequest);
    } catch (err) {
        throw new Error(err.message);
    }
}