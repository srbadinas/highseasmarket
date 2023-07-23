import { query } from "@utils/db";
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    try {
        const { slug } = params;
        const products = await query(`SELECT * FROM products  WHERE slug = ?`, [slug]);
        const product = products[0];

        if (!product) {
            throw new Error("Product not found");
        }

        return NextResponse.json(product);
    } catch (err) {
        throw new Error(err.message)
    }
}