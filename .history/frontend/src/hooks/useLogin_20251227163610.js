import React, { useState } from 'react'
import { toast } from 'sonner'

const useLogin = () => {
const [loading,setLoading]=useState(false)

const login=async (username,password)=>{
setLoading(true)

try {
const res= await fetch("/api/auth/login",{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,password})
})

const data = await res.json()
if(data.error){
    throw new Error(data.error)
}

localStorage.setItem("chat-user",JSON.stringify(data))
} catch (error) {
    toast.error(error.message)
}finally{
    setLoading(false)
}




}


return {loading,login}
}

export default useLogin