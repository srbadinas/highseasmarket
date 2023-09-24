import { query } from "@utils/db";
import { NextResponse } from "next/server";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
    try {
        const requestHeaders = new Headers(req.headers);
        const ip_address = requestHeaders.get('x-forwarded-for');
        const { slug } = params;
        const session = await getServerSession(authOptions);

        const listingDetails = {
            product: {},
            productsFromMerchant: [],
            similarProducts: [],
        };

        const [product] = await query(`SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id where p.slug = ?`, [slug]);

        const { id, created_by, category_id } = product;

        const productsFromMerchant = await query(`SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id where p.created_by_user_id = ? AND p.id != ? LIMIT 5`, [created_by, id]);

        const similarProducts = await query(`SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id where p.category_id = ? AND p.id != ? LIMIT 5`, [category_id, id]);

        listingDetails.product = product;
        listingDetails.productsFromMerchant = productsFromMerchant;
        listingDetails.similarProducts = similarProducts;

        const checkRecentView = await query(`SELECT *, TIMESTAMPDIFF(minute, created_at, UTC_TIMESTAMP()) FROM product_views 
        WHERE 
        product_id=${product.id}
        AND ip_address='${ip_address}'
        ${session?.user.id ? `AND user_id = ${session?.user.id}` : ``}
        AND TIMESTAMPDIFF(minute, created_at, UTC_TIMESTAMP()) < 5
        ORDER BY created_at DESC
        LIMIT 1
        `);

        if (checkRecentView.length == 0) {
            await query('INSERT INTO product_views(product_id, user_id, ip_address) VALUES (?, ?, ?)', [product.id, session?.user.id ? session?.user.id : null, ip_address])
        }

        return NextResponse.json(listingDetails);


    } catch (err) {
        throw new Error(err.message);
    }
}