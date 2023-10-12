import React, { useRef, useState } from 'react'
import FitnessImg from "../../assets/images/fitness.png";
import './style.scss'
import VerificationImg from '../../assets/images/verification-img.png'
import CaureselImg from '../../assets/images/Caurusel-2.png'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const codeRef = useRef();
  const [isLoad, setIsLoad] = useState(false);

  const gmail = JSON.parse(localStorage.getItem('verifEmail'));

 async function verificationHandler(e){
  e.preventDefault()
  if(!codeRef.current.value.trim().length){
    return toast.error(`Kodni kiriting!`)
  }
  try {
    const {data} = await axios.post(`${BACKEND_URL}/users/verification`, {
      pass : codeRef.current.value.trim(),
      gmail : gmail
    })
    if(data.success){
     toast.success(data.message)
     localStorage.setItem('userDatas', JSON.stringify({...data.data, token : data.token}))
     navigate('/')
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
 }

  return (
    <div className="verification-page flex page">
      <div className="left flex flex-column justify-center items-center">
        <img src={FitnessImg} alt="rasm" className="fitness-img" />
        <div className="txt flex flex-column gap-3">
        <h3 className="login_txt">Login</h3>
        <p className="short_desc">qisqacha ta'rif</p>
        <img src={CaureselImg} className='carusel'/>
        </div>
      </div>
      <div className="right w-50 bg-white">
        <h3 className='title'>Second Step Verification</h3>
        <img src={VerificationImg} alt='image' className='verif_img'/>
        <p className='explain'>Enter the verification code we sent to <br/> <a target="_blank" rel="noopener noreferrer" className='text-primary' href={'https://mail.google.com/mail/u/0/#inbox'}>{gmail}</a> </p>
        <form onSubmit={verificationHandler}>
            <input placeholder='Type code here' maxLength={4} ref={codeRef}/>
            <button>{isLoad ? <div className="flex justify-center my-1 items-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div> : "Submit"}</button>
            <p className='resend'>Didn't get the code? <span>Resend</span></p>
            {/* <p className='call_me'>Call me</p> */}
        </form>
      </div>
    </div>
  )
}

export default Verification
