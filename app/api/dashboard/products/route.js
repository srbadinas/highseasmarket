import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const res = await query('SELECT * FROM products ORDER BY created_at DESC');
        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}

export async function POST(req) {
    try {
        const productData = await req.json();
        const { product_images, uploaded_images, created_by, ...product } = productData;

        product.product_price = product.product_price.replace(/[^\d.]/g, "");

        const res = await query(`INSERT INTO products SET ?`, product);
        let productId = res.insertId;

        [...uploaded_images].map(async (item, i) => {
            const isActive = (i == 0 ? 1 : 0);
            const productImageResponse = await query(`INSERT INTO product_images (product_id, image_url, is_active) VALUES (?, ?, ?)`, [productId, item.image_url, isActive]);
        });

        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}