import React, { useEffect, useState } from 'react'
import {useSocket} from '../Contexts/SocketProvider'

export default function Messages() {
    const [users, getUsers] = useState("");
    const [message, getMessage] = useState("");
    let socket = useSocket();

    useEffect(() => {
        if(socket != null) {
            socket.on("send-users", (data) => {
                getUsers(data)
            });

            socket.on("receive-message", (data) => {
                getMessage(data)
            });
        }
      }, [socket]);

    useEffect(()=> {
        if(socket != null) {
            socket.emit("get-users")
        }
    }, [socket])

    function test() {
        console.log(users);
    }

    function test2() {
        console.log(message);
    }

    function sendMessage() {
        let test = {
            user: 'DARIAN',
            msg: "This is a test message"
        }
        socket.emit("send-message", test)
    }

    return (
        <div>
            <button onClick={test}>Test</button>
            <button onClick={test2}>Test2</button>
            <button onClick={sendMessage}>Message</button>
        </div>
    )
}
