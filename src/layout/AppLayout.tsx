import React from 'react'
import { Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div>
      사이드바가 오는 곳
      <Outlet/>
    </div>
  )
}

export default AppLayout