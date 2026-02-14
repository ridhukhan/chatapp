import React from 'react'
import Sidebar from '../../Components/sidebar/Sidebar'
import MessageContainer from '../../Components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-o  flex  h-50vh rounded-lg overflow-hidden'>    <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home