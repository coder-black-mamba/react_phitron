import React from 'react'
import { NavLink } from 'react-router'

export default function HomePage() {
  return (
    <div className="my-5 p-10 h-screen flex items-center justify-center">
      <div className="center gap-5">
        <NavLink to="/sign-up" className="btn btn-warning px-10">Signup</NavLink>
        <NavLink to="/login" className="btn btn-warning px-10">Login</NavLink>
        <NavLink to="/forgot-password" className="btn btn-warning px-10">Forgot Password</NavLink>
        <NavLink to="/" className="btn btn-warning px-10">Please Go Through Sign Up For Resending The Activation Email</NavLink>
      </div>
    </div>
  )
}
