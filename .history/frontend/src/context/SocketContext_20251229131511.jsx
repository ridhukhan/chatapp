import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

export const SocketContext=createContext();


export const SocketContextProvider= ({children})=>{

const [socket, setSocket]=useState(null);
const [onlineUser,setOnlineUser]=useState([])

const {authUser}=useAuthContext()

useEffect(()=>{

    if(authUser){
    const socket=io("http://localhost:8000");

setSocket(socket);
return ()=> socket.close();
    }else{

        if(socket){

            socket.close();
            setSocket(null)
        }
    }
})
    return <SocketContext.Provider value={{socket,onlineUser}}>{children}</SocketContext.Provider>;
};