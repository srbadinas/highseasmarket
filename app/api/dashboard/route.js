import { query } from "@utils/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('user_id');

        const [user] = await query(`SELECT * FROM users WHERE id = ?`, [userId]);

        const dashboardCount = {};

        if (user.user_role_id == 1) {
            const [users] = await query('SELECT COUNT(id) as count FROM users');
            const [productRequests] = await query('SELECT COUNT(id) as count FROM product_requests');
            const [products] = await query('SELECT COUNT(id) as count FROM products');
            dashboardCount.users_count = users.count;
            dashboardCount.product_requests_count = productRequests.count;
            dashboardCount.products_count = products.count;
        }

        if (user.user_role_id == 2) {
            const [myProductRequests] = await query('SELECT COUNT(id) as count FROM product_requests WHERE requested_by_user_id = ?', [user.id]);
            const [productRequests] = await query('SELECT COUNT(id) as count FROM product_requests WHERE requested_to_user_id = ?', [user.id]);
            const [products] = await query('SELECT COUNT(id) as count FROM products WHERE created_by_user_id = ?', [user.id]);
            dashboardCount.my_product_requests_count = myProductRequests.count;
            dashboardCount.product_requests_count = productRequests.count;
            dashboardCount.products_count = products.count;
        }

        if (user.user_role_id == 3) {
            const [myProductRequests] = await query('SELECT COUNT(id) as count FROM product_requests WHERE requested_by_user_id = ?', [user.id]);
            dashboardCount.my_product_requests_count = myProductRequests.count;
        }

        dashboardCount.invoices_count = 0;
        dashboardCount.messages_count = 0;

        return NextResponse.json(dashboardCount);

    } catch (err) {
        throw new Error(err.message);
    }
}