import React from 'react'
import Navbar from './Navbar';
import Search from './Serach';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Navbar />
    <Search />
    <Chats />
    </div>
  )
}

export default Sidebar