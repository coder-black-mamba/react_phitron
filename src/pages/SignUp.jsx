import React from 'react'
import { NavLink } from 'react-router'

export default function SignUp() {
  return (
    <div className="min-h-screen p-5 flex items-center justify-center">
      <form action="" className='min-w-1/2 p-5 border-2 border-black rounded bg-base-200'>
        <h1 className='text-2xl font-bold text-center py-2 border-b-2 border-black'>Sign Up </h1>
        <div className="my-3">
          <label htmlFor="email" className='label block'>Email</label>
          <input type="email" id='email' className="input w-full" placeholder='Enter Your Email' />
        </div>
        <div className="my-3">
          <label htmlFor="first-name" className='label block'>First Name</label>
          <input type="text" id='first-name' className="input w-full" placeholder='Enter Your First Name' />
        </div>
        <div className="my-3">
          <label htmlFor="last-name" className='label block'>Last Name</label>
          <input type="text" id='last-name' className="input w-full" placeholder='Enter Your Last Name' />
        </div>
        <div className="my-3">    
          <label htmlFor="phone" className='label block'>Phone</label>
          <input type="text" id='phone' className="input w-full" placeholder='Enter Your Phone' />
        </div>
        <div className="my-3">  
          <label htmlFor="address" className='label block'>Address</label>
          <input type="text" id='address' className="input w-full" placeholder='Enter Your Address' />
        </div>
        <div className="my-3">  
          <label htmlFor="password" className='label block'>Password</label>
          <input type="password" id='password' className="input w-full" placeholder='Enter Your Password' />
        </div>
        <div className="my-3">
          <label htmlFor="confirm-password" className='label block'>Confirm Password</label>
          <input type="password" id='confirm-password' className="input w-full" placeholder='Enter Your Password Again To Confirm' />
        </div>
        <div className="my-3">
          <button className='btn btn-warning w-full'>Sign Up</button>
        </div>
        <div className="my-5">
          {/* <p>Already have an account? <NavLink to="/sign-in" className='btn btn-warning px-10'>Sign In</NavLink></p> */}
          <p className='text-center text-sm text-muted text-base-content'> Already have an account? <NavLink to={"/"} className="text-info underline">Sign In </NavLink>  or <NavLink to="/forgot-password" className='text-info underline'>Forgot Your Password</NavLink></p>
        </div>
      </form>
    </div>
  )
}
