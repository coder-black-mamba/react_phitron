import React from 'react'
import { Outlet } from 'react-router'

export default function BaseLayout() {
  return (
    <div>
        <h1>Base Layout</h1>
        <Outlet/>
        <footer>Base Layout Foolter</footer>
    </div>
  )
}
