import { query } from "@utils/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const filters = await req.json();
        const { keywords, category, sortField, sortDirection, limit } = filters;
        console.log(keywords);

        const products = await query(`SELECT 
        p.*, 
        u.unit, 
        (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url 
        FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE is_publish = 1
        ${category ? `AND c.slug = '${category}'` : ``}
        ${keywords ? `AND CONCAT(p.product_name, ' ', p.product_description) LIKE '%${keywords}%'` : ``}
        ORDER BY ${sortField ? `${sortField}` : `created_at`}
        ${sortDirection ? sortDirection : 'desc'}
        ${limit ? `LIMIT ${limit}`  : ''}
        `);

        return NextResponse.json(products);
    } catch (err) {
        throw new Error(err.message);
    }
}