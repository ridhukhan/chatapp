
import React, { useState } from 'react'
import {toast} from 'sonner'

const useSignup = () => {
 const [loading,setLoading]=useState(false)


const signup=async({fullname,username,password,confirmpassword, gender})=>{

const success =handleInputErrors({fullname,username,password,confirmpassword, gender})

if(!success)return;

setLoading(true)
try {
    const res= await fetch("/api/auth/signup",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({fullname,username,password,confirmpassword, gender})
    })
    const data =await res.json()
    console.log(data)
} catch (error) {
   toast.error(error.message) 
}finally{
    setLoading(false);
}

};

return {loading, signup}


}

export default useSignup


function handleInputErrors({fullname,username,password,confirmpassword, gender}){

    if(!fullname || !username || !password || !confirmpassword ||!gender){


toast.error("please fill in all fields")
return false;


    }


if(password!==confirmpassword){
    toast.error("password and confirm pass not match")
    return false
}

if(password.length =='7') {

    toast.error("password must be at least 6 characters");
    return false;
}

return toast.success("Signup Success",{className:"bg-green-500 font-bold text-lg rounded-xl shadow-lg" });


}