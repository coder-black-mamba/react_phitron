import React , {useState} from 'react'
import { useForm } from 'react-hook-form'
import apiClient from '../services/api-client';
import { redirect, useParams } from 'react-router';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

export default function ResetPasswordConfirm() {
    const { register, handleSubmit,watch, formState: { errors ,isSubmitting  } } = useForm();
    const [errorState, setErrorState] = useState({})
    const [success, setSuccess] = useState(false)
    const {uid,token}=useParams()
    
    const onSubmit=async (data)=>{
        try {
            const submitData={
                uid,
                token,
                new_password:data.password
            }
          const response = await apiClient.post("/auth/users/reset_password_confirm/", submitData);
          console.log(response)
          if(response.status === 204){
            setErrorState(null)
            setSuccess(true)
            redirect("/login")
          }
        } catch (error) {
          setErrorState(error.response.data);
        }
      }
      
  return ( 
    <div className="flex items-center justify-center min-h-screen">
        <form action="" className='p-5 w-1/2 border-2 border-black rounded bg-base-200'>
            <h1 className='text-2xl font-bold text-center py-2 border-b-2 border-black'>Reset Password </h1>
            {success && <SuccessAlert message="Password Reset Successfully. Please Login With Your New Password" />}
            {errorState && Object.keys(errorState).map((errorKey,index)=> {
                return <ErrorAlert className='my-2 capitalize' key={index} message={`${ errorKey}: ${errorState[errorKey]}`} />
            })}
            <div className="my-3">
                <label htmlFor="password" className='label block'>Password</label>
                <input type="password" id='password' className="input w-full" placeholder='Enter Your Password' {...register("password",{required:"Password is required", pattern: {
                    // Regular expression to validate passwords.
                    // It matches the entire string and allows for the following patterns:
                    // - A password must have at least 8 characters.
                    // - A password must contain at least one uppercase letter.
                    // - A password must contain at least one lowercase letter.
                    // - A password must contain at least one digit.
                    // - A password must contain at least one special character.
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Invalid Password . Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
                }})}  />
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>
            <div className="my-3">
                <label htmlFor="confirm_password" className='label block'>Confirm Password</label>
                <input type="password" id='confirm_password' className="input w-full" placeholder='Enter Your Password Again To Confirm' {...register("confirm_password",{required:"Confirm Password is required", validate: (value) => value === watch("password") || "Passwords do not match"})}  />
                {errors.confirm_password && <p className='text-red-500'>{errors.confirm_password.message}</p>}
            </div>
            <div className="my-3">
                <button className='btn btn-warning w-full' onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>Reset Password {isSubmitting && <span className="loading loading-ring loading-md"></span>}
                </button>
            </div>        
        </form> 
    </div>
  )
}
