import { useEffect, useState } from "react";
import { Button } from "../components/Button";

import { io } from "socket.io-client";

import { SOCKET_URL } from "../lib/api";

export const Test = () => {

    const socket = io(SOCKET_URL);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const getMessages = (message) => {
        console.log(message);
        setMessages([...messages, message])
    };

    const handleSendMessage = () => {

        socket.emit('message', message);

        socket.emit('setUser', 'heldi');
        
        setMessage('');
    };

    useEffect(() => {
        socket.on('getMessages', (message: string) => {
            getMessages(message)
        });

        socket.on('getUser', (user) => console.log(user));

    }, [socket]);

    return (
        <div>
            <div className="flex flex-col p-2 text-base">
                {messages.map((msg, index) => (
                    <div key={index} className="p-3 border-b border-slate-500">: {msg}</div>
                ))}
            </div>
            <div className='flex items-center justify-around'>
                <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='border border-slate-300 px-2 py-1 roudned-sm'/>
                <Button onClick={handleSendMessage}>Send Message</Button>
            </div>
        </div>
    );
};