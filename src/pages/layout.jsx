import React from 'react'
import Aside from '../components/aside'
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate();
  const UserDatas = JSON.parse(localStorage.getItem('userDatas'));

  useEffect(() => {
    if(!UserDatas){
      navigate('/login')
   }
    alanBtn({
      key: "f743a924016d5b610a5f88ef67bc7d9c2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log(commandData);
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        } else if (commandData.command == "Teacher") {
          navigate("/teachers");
        }else if(commandData.command == 'Home'){
          navigate("/");
        }
      },
    });
  }, []);
  return (
    <div className='flex '>
      <Aside/>
      <div className='pages w-100'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Layout
