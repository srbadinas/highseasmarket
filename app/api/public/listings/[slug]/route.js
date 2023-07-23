import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { slug } = params;

        const listingDetails = {
            product: {},
            productsFromMerchant: [],
            similarProducts: [],
        };

        const products = await query(`SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id where p.slug = ?`, [slug]);

        const { id, created_by, category_id } = products[0];

        const productsFromMerchant = await query(`SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id where p.created_by_user_id = ? AND p.id != ? LIMIT 5`, [created_by, id]);

        const similarProducts = await query(`SELECT p.*, u.unit, (SELECT i.image_url from product_images i WHERE i.product_id = p.id AND is_active = 1 ORDER BY created_at DESC LIMIT 1) as image_url FROM products p 
        LEFT JOIN units u ON p.unit_id = u.id where p.category_id = ? AND p.id != ? LIMIT 5`, [category_id, id]);

        listingDetails.product = products[0];
        listingDetails.productsFromMerchant = productsFromMerchant;
        listingDetails.similarProducts = similarProducts;

        return NextResponse.json(listingDetails);
    } catch (err) {
        throw new Error(err.message);
    }
}