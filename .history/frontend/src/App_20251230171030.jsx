
import './App.css'
import {Routes, Route, Navigate} from "react-router-dom"
import Home from './Pages/home/Home'
import Login from './Pages/login/Login'
import SignUp from './Pages/signup/SignUp'
import { useAuthContext } from './context/AuthContext'

import { Toaster } from 'sonner'
function App() {
const {authUser}=useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Toaster  />
<Routes>

<Route path="/" element={authUser?<Home/>:<Navigate to={"/login"}/>}/>
<Route path="/login" element={authUser? <Navigate to="/"/>:<Login/>}/>
<Route path="/signup" element={authUser?<Navigate to="/"/>: <SignUp/>}/>
</Routes>

    </div>
  )
}

export default App
