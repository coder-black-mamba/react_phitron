import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../services/api-client';
import SuccessAlert from '../components/SuccessAlert';

export default function ResetPassword() {

  const { register, handleSubmit, formState: { errors ,isSubmitting } } = useForm();
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // without using context
  const onSubmit=async (data)=>{
    try {
      const response = await apiClient.post("/auth/users/reset_password/", data);
      if(response.status === 204){
        setError(null)
        setSuccess(true)
      }
      console.log(response)
    } catch (error) {
      setError(error.response.data)
      console.log(error.response.data)
    }
  }



  return (
    <div className="min-h-screen p-5  flex items-center justify-center">
      <form action="" className='p-5 min-w-1/2 border-2 border-black rounded bg-base-200'>
        <h1 className='text-2xl font-bold text-center py-2 border-b-2 border-black'>Reset Password </h1>
        
        {error && <p className='text-red-500'>{error.detail}</p>}
        {/* {success && <SuccessAlert message="Password Reset Email Sent To Your Email Successfully" />} */}

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
