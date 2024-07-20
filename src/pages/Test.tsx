import { useEffect, useState } from "react";
import { useSocket } from "../contexts/socketContext"

function Test() {

    const { listener, subscribe, unsubscribe } = useSocket();
    const [value, setValue]= useState<string>('Hello from client');

    const onClick = () => {
        listener?.emit('tagsTest', { message: 'Hello from client' });
    }

    useEffect(() => {
        subscribe('tagsTest', (data: any) => {
            setValue(data.message);
        });

        return () => {
            unsubscribe('tagsTest');
        }
    }, [value, listener]);

    return (
        <div className="w-[98%] m-auto">
            <span className="text-green-500 font-semibold" onClick={onClick}>{value}</span>
        </div>
    )
}

export default Test;