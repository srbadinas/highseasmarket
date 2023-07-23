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
        const requestData = await req.formData();

        const productData = {};

        [...requestData].map(([name, value]) => {
            productData[name] = value;
        });

        const { uploaded_images, ...product } = productData;

        product.product_price = product.product_price.replace(/[^\d.]/g, "");

        const res = await query(`INSERT INTO products SET ?`, product);
        let productId = res.insertId;

        // [...uploaded_images].map(async item => {
        //     // const productImageResponse = await query(`INSERT INTO product_images (product_id, image_url, is_active) VALUES (?, ?)`, [productId, item.image_url, 1]);
        // });

        return NextResponse.json(res);
    }
    catch (err) {
        throw new Error(err.message);
    }
}