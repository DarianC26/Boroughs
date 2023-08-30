import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ user, children }) {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'http://localhost:8800'
    )
    console.log(newSocket)
    newSocket.emit("add-user", user)
    setSocket(newSocket)

    return () => newSocket.disconnect()
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}