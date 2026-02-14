import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useSignup = () => {
 const [loading,setLoading]=useState(false)


const signup=async({fullname,username,password,confirmpassword, gender})=>{

const success =handleInputErrors({fullname,username,password,confirmpassword, gender})

if(!success)return;




}







}

export default useSignup


function handleInputErrors({fullname,username,password,confirmpassword, gender}){

    if(!fullname || !username || !password || !confirmpassword ||!gender){


toast.error("please fill in all fields")







    }










}