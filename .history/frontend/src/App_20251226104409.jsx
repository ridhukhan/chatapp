
import './App.css'
import Home from './Pages/home/Home'
import Login from './Pages/login/Login'
import SignUp from './Pages/signup/SignUp'

function App() {

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<SignUp/>}/>
</Routes>
    </div>
  )
}

export default App
