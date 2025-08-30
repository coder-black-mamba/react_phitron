import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../services/api-client';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';
import useAuthContext from '../hooks/useAuthContext';

export default function ResetPassword() {

  const { register, handleSubmit, formState: { errors ,isSubmitting } } = useForm(); 
  const {errorMsg,success,resetPassword } = useAuthContext()

  const onSubmit=async (data)=>{
    await resetPassword(data)
  }



  return (
    <div className="min-h-screen p-5  flex items-center justify-center">
      <form action="" className='p-5 min-w-1/2 border-2 border-black rounded bg-base-200'>
        <h1 className='text-2xl font-bold text-center py-2 border-b-2 border-black'>Reset Password </h1>
        
        {errorMsg && (
          <div className="my-3">
            <ErrorAlert message={errorMsg} />
          </div>
        )}
        {success ? (
          <div className='text-center p-3'>
            <SuccessAlert message="Password Reset Email Sent To Your Email Successfully . Please Check Your Email To Reset Your Password" />
          </div>
        ) : (
          <div>
            <div className="my-3">
              <label htmlFor="email" className='label block'>Email</label>
              <input type="email" id='email' className="input w-full" placeholder='Enter Your Email' {...register("email",{required:"Email is required", pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }})}  />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
            <div className="my-3">
              <button className='btn btn-warning w-full' onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Reset Password {isSubmitting && <span className="loading loading-ring loading-md"></span>}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
