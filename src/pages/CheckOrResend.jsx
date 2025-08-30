import React , {useState} from 'react'
import SuccessAlert from '../components/SuccessAlert'
import ErrorAlert from '../components/ErrorAlert'
import useAuthContext from '../hooks/useAuthContext'
import { useLocation } from "react-router";

export default function CheckOrResend() {
    const {errorMsg,success ,resendActivation } = useAuthContext()
    const location = useLocation();
    const email=location?.state?.email; 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResendSuccess, setIsResendSuccess] = useState(false);

    const onResend=async ()=>{
      const data={
        email
      }
      setIsSubmitting(true)
      await resendActivation(data)
      setIsResendSuccess(true)
      setIsSubmitting(false)
    }


  return (
    <div>
        <div>
              <div className="min-h-screen p-5  flex items-center justify-center">
                    <div className='p-5 min-w-1/2 border-2 border-black rounded bg-base-200'>
                      <h1 className='text-2xl font-bold text-center py-2 border-b-2 border-black'>Account Activation </h1>
                      
                      {errorMsg && (
                        <div className="my-3">
                          <ErrorAlert message={errorMsg} />
                        </div>
                      )}
                      {success &&(
                        <div className='text-center p-3'>
                          <SuccessAlert message="Activation Mail Sent Successfully" />
                        </div>
                      )}
                      {isResendSuccess &&(
                        <div className='text-center p-3'>
                          <SuccessAlert message="Resend Activation Mail Sent Successfully" />
                        </div>
                      )}
                      <div className="py-3 text-sm text-center">
                      <p>Still Did Not Receive Activation Email?</p>
                      <p>Click the button below to resend the activation email.</p>
                      </div>
                      <div className="my-2">
                      <button className='btn btn-warning w-full' onClick={onResend} disabled={isSubmitting}>Resend Activation Email {isSubmitting && <span className="loading loading-ring loading-md"></span>}</button>
                      </div>
                      
                    </div>
                  </div>
            </div>
    </div>
  )
}
