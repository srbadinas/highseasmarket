import { query } from "@utils/db";
import getUTCDateTime from "@utils/getUTCDateTime";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const [product] = await query(`SELECT p.*, CONCAT(u.firstname, ' ' , u.lastname) as created_by_user FROM products p LEFT JOIN users u ON p.created_by_user_id = u.id WHERE p.id = ` + id);

        if (!product) {
            throw new Error("Product not found");
        }

        const productImageRes = await query('SELECT * FROM product_images WHERE product_id = ' + id);

        product.product_images = productImageRes;

        return NextResponse.json(product);
    }
    catch (err) {
        return NextResponse.json(err.message);
    }
}

export async function POST(req) {
    try {
        const productData = await req.json();
        const { id, product_images, uploaded_images, created_at, created_by, created_by_user, ...product } = productData;

        product.updated_at = getUTCDateTime();
        product.product_price = product.product_price.replace(/[^\d.]/g, "");

        const res = await query('UPDATE products SET ? WHERE id = ?', [product, id]);
        await query('UPDATE product_images SET is_active = 0 WHERE product_id = ?', [id]);

        [...uploaded_images].map(async (item, i) => {
            const isActive = (i == 0 ? 1 : 0);
            const productImageResponse = await query(`INSERT INTO product_images (product_id, image_url, is_active) VALUES (?, ?, ?)`, [id, item.image_url, isActive]);
        });

        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await query('DELETE FROM product_requests WHERE product_id = ?', id);
        await query('DELETE FROM product_images WHERE product_id = ?', id);
        const res = await query('DELETE FROM products WHERE id = ?', id);
        return NextResponse.json(res);
    } catch (err) {
        throw new Error(err.message)
    }
}