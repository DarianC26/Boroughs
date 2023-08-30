import React, { useEffect, useState } from 'react'
import {useSocket} from '../Contexts/SocketProvider'

export default function Messages() {
    const [users, getUsers] = useState("");
    let socket = useSocket();

    useEffect(() => {
        if(socket != null) {
            socket.on("send-users", (data) => {
                getUsers(data);
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

    function sendMessage() {
        let test = {
            user: 'darianc',
            msg: "This is a test message"
        }
        socket.on("receive-message", (data) => {
            console.log(data);
        })
        socket.emit("send-message", test)
    }

    return (
        <div>
            <button onClick={test}>Test</button>
            <button onClick={sendMessage}>Message</button>
        </div>
    )
}
