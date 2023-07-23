import { query } from "@utils/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const keyword = searchParams.get('q') ?? '';
        const isPublish = searchParams.get('is_publish');
        const limit = searchParams.get('limit');
        const sortBy = searchParams.get('sort_by');
        const sortDirection = searchParams.get('sort_direction');

        const products = await query(`
        SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id 
        WHERE CONCAT(product_name, ' ', product_description) LIKE '%${keyword}%'
        ${isPublish ? 'AND is_publish = 1' : ''} 
        ORDER BY ${sortBy ? sortBy : 'created_at'}
        ${sortDirection ? sortDirection : 'desc'} `
            + (limit ? 'LIMIT ' + limit : ''));

        return NextResponse.json(products);
    } catch (err) {
        throw new Error(err.message);
    }
}