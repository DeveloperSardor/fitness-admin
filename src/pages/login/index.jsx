import React, {useState} from "react";
import "./style.scss";
import ArmImg from '../../assets/images/arm.png'
import FitnessImg from "../../assets/images/fitness.png";
import InformationImg from '../../assets/images/information.png';
import CaureselImg from '../../assets/images/Caurusel.png'
import { useRef } from "react";
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import axios from 'axios'

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [loginLoader, setLoginLoader] = useState(false)

  const emailRef = useRef();
  const passwordRef = useRef();



  async function loginHandler(e){
    e.preventDefault()
    if(!emailRef.current.value.trim().length){
    return  toast.error(`Email kiriting!`)
    }else if(!passwordRef.current.value.trim().length){
     return  toast.error(`Parol kiriting!`)
    }else if( emailRef.current.value.length &&
      !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
        emailRef.current.value.trim()
      )){
       return  toast.error(`Yaroqsiz email`)
      }
    try {
      setLoginLoader(true)
      const {data} = await axios.post(`${BACKEND_URL}/users/login-admin`, {
        gmail : emailRef.current.value.trim(),
        password : passwordRef.current.value.trim()
      })
      if(data.success){
        toast.success(data.message)
        localStorage.setItem('verifEmail', JSON.stringify(emailRef.current.value.trim()))
        navigate('/verification')
      }else{
       throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoginLoader(false)
    }
  }

  return (
    <div className="login-page flex page">
      <div className="left flex flex-column justify-center items-center">
        <img src={FitnessImg} alt="rasm" className="fitness-img" />
        <div className="txt flex flex-column gap-3">
        <h3 className="login_txt">Login</h3>
        <p className="short_desc">qisqacha ta'rif</p>
        <img src={CaureselImg} className='carusel'/>
        </div>
      </div>
      <div className="right bg-white w-[50%]">
      <form onSubmit={loginHandler}>
        <img src={ArmImg}/>
        <div className="texts mt-3 flex flex-column gap-1">
          <h3 className="welcome">Welcome back</h3>
           <p className="text_pls">Please login to access your account.</p>
        </div>
        <div className="inputs flex flex-column gap-2 mt-4">
       <label className="d-flex flex-column gap-2">
       <div className="top d-flex justify-content-between">
        G-mail
        
        <img src={InformationImg}/>
                      </div>
        <input type="email" ref={emailRef} placeholder="Type your g-mail"/>
       </label>
       <label>
        Password
        <input ref={passwordRef} type="password" placeholder="Type your password"/>
       </label>
        </div>
       <p className="forgot_pass">Forgot Password?</p>
       <button className="login_btn "> {!loginHandler ? <div className="flex justify-center my-1 items-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div> : "Log  In"}</button>
       <p className="dont_ac mt-3">Don't have an account <span className="sign_up">Sign Up</span></p>
      </form>
      </div>
    </div>
  );
};

export default Login;
