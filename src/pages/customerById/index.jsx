import React, { useEffect, useState } from 'react'
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import { useContext } from "react";
import context from "../../context";
import userImg from "../../assets/images/customer.png";
import userIcon from "../../assets/images/user-icon.png";
import calendarIcon from "../../assets/images/teacher-need-2.png";
import phoneIcon from "../../assets/images/phone-icon.png";
import { useNavigate } from 'react-router-dom';
import RightHeader from '../../components/right-header';
import toast from 'react-hot-toast';
import axios from 'axios';


const CustomerById = () => {
  document.title = "Mijoz"
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const userDatas = JSON.parse(localStorage.getItem('userDatas'));

  const contextDatas = useContext(context);
  const {isOpenEditModal, setIsOpenEditModal, defaultData, setDefaultData} = contextDatas;

  function convertToRealTime(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  function viewModal(){
    setIsOpenEditModal(!isOpenEditModal)
    setDefaultData(userDatas)
   }

  const birth_date = convertToRealTime(userDatas?.birth_date);
  const getFullYear = new Date().getFullYear();



   function logOut(){
     localStorage.removeItem('userDatas');
     navigate('/login')   
  }


  return (
    <div className='customerById-page page'>

        <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Men</h3>
        <RightHeader/>
      </div>


      <section className="data-box">
        <div className="top">
          <h3 className="headings">Mening ma'lumotlarim</h3>
        </div>
        <div className="info_box flex flex-column gap-3 px-3">
          <div className="first flex gap-5">
            <img src={userDatas?.img} alt="user image" className="user_img" />
            <div className="right_box flex flex-column  p-2 w-[55%] ">
              <div className="name_id flex justify-between">
                <h3 className="name">{userDatas?.lastname} {userDatas?.firstname}</h3>
                <p className="_id">ID {userDatas?._id}</p>
              </div>
              <p className="age">{getFullYear - birth_date.slice(birth_date.length - 4)} yosh</p>
              <div className="gender_gmail flex items-center justify-between">
                <p className="gender text-capitalize">{userDatas?.gender}</p>
                <p className="gmail">{userDatas?.gmail}</p>
              </div>
              <div className="bottom flex items-center justify-between">
                
                
                <div className="item flex gap-2">
                  <img src={phoneIcon} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">Tel:</p>
                    <p className="num">+998{userDatas?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
        <div className="bottom">
          <div className="btns flex w-[25%] justify-between items-center">
            <button className="edit" onClick={viewModal}>o'zgartirish</button>
            <button className="delete" onClick={logOut}>Logout</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default CustomerById
