import { query } from "@utils/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;

        const [isChatExists] = await query(`SELECT * 
        FROM chats c 
        WHERE product_request_id = ?`, id);

        if (!isChatExists) {
            const res = await query(`INSERT INTO chats (product_request_id, subject) VALUES(?, ?)`, [id, 'Product Request'])
        }

        const [chat] = await query(`SELECT * 
        FROM chats c 
        WHERE product_request_id = ?`, id);

        chat.messages = await query(`SELECT 
        cm.*,
        CONCAT(SUBSTRING(s.firstname, 1, 1), SUBSTRING(s.lastname, 1, 1)) as sender,
        CONCAT(SUBSTRING(r.firstname, 1, 1), SUBSTRING(r.lastname, 1, 1)) as recipient
        FROM chat_messages cm
        LEFT OUTER JOIN users s ON cm.sender_id = s.id
        LEFT OUTER JOIN users r ON cm.recipient_id = r.id
        WHERE cm.chat_id = ? ORDER BY cm.created_at DESC`, chat.id);

        console.log(chat);

        return NextResponse.json(chat);
    } catch (err) {
        throw new Error(err.message);
    }
}