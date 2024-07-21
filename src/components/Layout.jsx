import React from 'react'
import { Outlet } from 'react-router-dom'
import AvatarComp from './Avatar'
import Menu from './Menu'
import UserNavbar from './UserNavbar'
const Layout = () => {
return (
    <div>
        <UserNavbar/>
        <Outlet />
    </div>
)
}

export default Layout
