import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import SignUp from '../pages/SignUp'
import BaseLayout from '../layouts/BaseLayout'
import ResetPassword from '../pages/ResetPassword'
import Activation from '../pages/AccountActivation'
import AccountActication from '../pages/AccountActivation'

export default function AppRouter() {
  return (
    <Routes>
        <Route element={<BaseLayout/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='forgot-password' element={<ResetPassword/>} />
            <Route path='/activate-account' element={<AccountActication/>} />
        </Route>
    </Routes>
    
    
  )
}
