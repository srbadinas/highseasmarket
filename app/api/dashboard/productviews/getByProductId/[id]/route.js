import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const productViews = await query(`SELECT 
        v.*,
        CONCAT(u.firstname, ' ', u.lastname) as fullname 
        FROM
        product_views v
        LEFT JOIN users u ON v.user_id = u.id
        WHERE product_id = ${id}
        ORDER BY created_at DESC
        `
        );

        return NextResponse.json(productViews);
    }
    catch (err) {
        return NextResponse.json(err.message);
    }
}