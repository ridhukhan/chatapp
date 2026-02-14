import { createContext, useState } from "react";

export const SocketContext=createContext();


export const SocketContextProvider= ({children})=>{

const [sockeet, setSocket]=useState(null)
    return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};