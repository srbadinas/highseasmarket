import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const [listingRequests] = await query(`SELECT lr.*, CONCAT(u.firstname, ' ', u.lastname) as requested_by_user
        FROM listing_requests lr
        LEFT OUTER JOIN users u ON lr.requested_by_user_id = u.id
        WHERE lr.id = ?`, id);
        return NextResponse.json(listingRequests);
    }
    catch (err) {
        throw new Error(err.message);
    }
}