import React from 'react'
import { useNavigate } from 'react-router-dom'

const RightHeader = () => {
    const navigate= useNavigate()
    const userDatas = JSON.parse(localStorage.getItem('userDatas'))
  return (
    <div className="right w-[25%] items-center flex justify-between">
  
    <div className='item'>
      <i className="fa-solid fa-bell bell_icon"></i>
    </div>
    <div className='item'>
      <i className="fa-solid fa-gear setting_icon"></i>
    </div>
      <div className="title d-flex flex-column gap-1">
        <p className="name">{userDatas?.lastname}.{userDatas?.firstname.slice(0,1)} </p>
        <p className="who">{userDatas?.phone}</p>
      </div>
      <img
      onClick={()=>navigate('/my-profile')}
        src={userDatas?.img}
        alt="profile image"
        className="profile_img h-[45px] w-[50px]"
      />
    </div>
  )
}

export default RightHeader
