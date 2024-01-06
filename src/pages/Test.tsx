import { useState } from "react";
import { io } from "socket.io-client";

export const Test = () => {
    const socket = io('http://localhost:5000'); // Corrigido para corresponder à porta do servidor

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = () => {
        socket.emit('message', message);

        socket.on('message', (message: string) => {
            setMessages((messages) => [...messages, message]);
        });

        setMessage('');
    };

    return (
        <div>
            <div className="flex flex-col p-2 bg-red-500">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className='flex items-center justify-around'>
                <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} className='bg-yellow-300'/>
                <button onClick={handleSendMessage}>Send Message</button>
            </div>
        </div>
    );
};