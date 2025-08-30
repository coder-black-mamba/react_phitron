import React from 'react'
import SuccessAlert from '../components/SuccessAlert'
import ErrorAlert from '../components/ErrorAlert'
import useAuthContext from '../hooks/useAuthContext'

export default function CheckOrResend() {
    const {errorMsg,success } = useAuthContext()

    const onResend=async ()=>{
      // await activateUser(data)
      console.log('On resend')
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
                          <SuccessAlert message="Account Activated Successfully" />
                        </div>
                      )}
                      <div className="my-2">
                        <SuccessAlert message="Activation Mail Sent Successfully !" />
                      </div>
                      <div className="py-3 text-sm text-center">
                      <p>Still Did Not Receive Activation Email?</p>
                      <p>Click the button below to resend the activation email.</p>
                      </div>
                      <div className="my-2">
                      <button className='btn btn-warning w-full' onClick={onResend}>Resend Activation Email</button>
                      </div>
                      
                    </div>
                  </div>
            </div>
    </div>
  )
}
