
import './App.css'
import Home from './Pages/home/Home'
import Login from './Pages/login/Login'
import SignUp from './Pages/signup/SignUp'

function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
<Routes path="/" element={<Home/>}/>
<Routes path="/login" element={<Login/>}/>
<Routes path="/signup" element={<SignUp/>}/>

    </div>
  )
}

export default App
