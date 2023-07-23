'use client'

import Alert from "@components/Alert";
import Button from "@components/Button";
import InputTextArea from "@components/InputTextArea";
import generateUniqueId from "@utils/uniqueId";
import moment from "moment";
import { useSession } from "next-auth/react"
import { useState } from "react";

const ChatBox = ({ senderId, recipientId, chat, refetch }) => {
    const { data: session } = useSession();
    const [messageBody, setMessageBody] = useState('');

    const [message, setMessage] = useState(null);
    const [processing, setProcessing] = useState(false);

    const onHandleKeyDown = (e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = async () => {
        setProcessing(true);

        try {
            const data = {
                chat_id: chat.id,
                sender_id: senderId,
                recipient_id: recipientId,
                message: messageBody,
            };

            const res = await fetch('/api/dashboard/chat/postMessage', {
                'method': 'POST',
                'header': {
                    'Authorization': session.user.access_token,
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error('Something went wrong. Please try again later.');
            };

            setMessageBody('');
            refetch();
        }
        catch (err) {
            setMessage({
                type: 'error',
                content: err.message,
            });
        }
        finally {
            setProcessing(false);
        }
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        sendMessage();
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col-reverse h-[450px] bg-gray-100 p-4 mb-4 overflow-y-auto">
                {
                    chat?.messages && chat.messages.map(item => {
                        return <div key={generateUniqueId(item.id)} className={"w-full flex mb-2 gap-x-2 items-center " + (senderId == item.sender_id ? "flex-row-reverse" : "")}>
                            <div className="bg-gray-200 border-2 border-gray-300 rounded-full p-2">{item.sender}</div>
                            <div className={"rounded px-3 py-2 " + (senderId == item.sender_id ? "bg-white" : "bg-gray-300")}>
                                <div className="text-xs text-gray-500 text-right">{MessageDateTimeDisplay(item.created_at)}</div>
                                <div className="w-full" dangerouslySetInnerHTML={{ __html: item.message }}></div>
                            </div>
                        </div>
                    })
                }
            </div>
            <form method="POST" onSubmit={(e) => onHandleSubmit(e)}>
                {
                    message ? <Alert type={message.type} message={message.content} /> : ''
                }

                <div className="mb-4">
                    <InputTextArea name="message_body" value={messageBody} placeholder="Type your message here..." required processing={processing} handleChange={(e) => setMessageBody(e.target.value)} handleKeyDown={onHandleKeyDown} />
                </div>
                <div className="text-right">
                    <Button className="btn-success" processing={processing}>Send</Button>
                </div>
            </form>
        </div>
    )
}

const MessageDateTimeDisplay = (datetime) => {
    return moment(datetime).format(`DD MMM ${(moment(datetime).format('YYYY') != moment().format('YYYY') ? "YYYY" : "")}, hh:mm a`)
}

export default ChatBox