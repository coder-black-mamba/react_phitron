import React , {useState} from 'react'
import useAuthContext from '../hooks/useAuthContext';
import ErrorAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
 
export default function AccountActication() {
  const {errorMsg,success,activateUser } = useAuthContext()
  const navigate = useNavigate();
  const {uid,token}=useParams();  
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  if(success){
    navigate("/login")
  }



  const onResend=async ()=>{
    const data={
      uid,
      token
    }
    setIsSubmitting(true)
    await activateUser(data)
    setIsSubmitting(false)
    
  }



  return (
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
              <button className='btn btn-success w-full' onClick={onResend} disabled={isSubmitting}>Activate Your Account {isSubmitting && <span className="loading loading-ring loading-md"></span>}</button>
              </div> 
              
            </div>
          </div>
    </div>
  )
}
