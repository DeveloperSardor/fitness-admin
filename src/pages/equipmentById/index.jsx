import React, { useEffect, useState } from 'react'
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import countImg from '../../assets/images/count.png'
import priceImg from '../../assets/images/price.png'
import calendarIcon from "../../assets/images/teacher-need-2.png";
import equipmentImg from '../../assets/images/equipment.png'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import RightHeader from '../../components/right-header';
import { useContext } from "react";
import context from "../../context";

const EquipmendById = () => {
    document.title = "Jihoz"
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const userDatas = JSON.parse(localStorage.getItem('userDatas'))
    const [equipment, setEquipment] = useState()

const {id} = useParams();

const contextDatas = useContext(context);
const {
  isOpenEditProduct,
  setIsOpenEditProduct,
  defaultDataProduct,
  setDefaultDataProduct,
} = contextDatas;

function viewModal(){
  setIsOpenEditProduct(!isOpenEditProduct)
  setDefaultDataProduct(equipment)
 }


async function GetEquipment(){
try {
  const {data} = await axios.get(`${BACKEND_URL}/products/equipments/${id}`, {headers : {token : userDatas?.token}})
  if(data.success){
    setEquipment(data.data)
  }else{
    throw new Error(data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}


async function DeleteEquipment(){
  try {
    const {data} = await axios.delete(`${BACKEND_URL}/products/delete-product/${equipment?._id}`, {headers : {token: userDatas?.token}})
    if(data.success){
      toast.success(data.message)
       navigate('/equipments')
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
GetEquipment()
}, [])

  return (
    <div className='equipmendById-page page'>
      
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Jihoz</h3>
        <RightHeader/>
      </div>


      <section className="data-box">
        <div className="top">
          <h3 className="headings">Jihoz ma'lumotlari</h3>
        </div>
        <div className="info_box flex flex-column gap-3 px-3">
          <div className="first flex gap-5">
            <img src={equipmentImg} alt="user image" className="user_img" />
            <div className="right_box flex flex-column  p-2 w-[55%] ">
                <h3 className="name">{equipment?.title}</h3>
                <p className="type">{equipment?.category}</p>
             
              <p className="company">{equipment?.company}</p>
              
              <div className="bottom flex items-center gap-5">
                <div className="item flex gap-2">
                <div className="count flex items-center justify-center">
                <p>S</p>
                 </div>
                  <div className="txts">
                    <p className="cat">Soni</p>
                    <p className="num">{equipment?.count}</p>
                  </div>
                </div>
              
                <div className="item flex gap-2">
                  <img src={priceImg} alt="user_icon" />
                  <div className="txts">
                    <p className="cat">Narxi</p>
                    <p className="num price">{equipment?.price} $</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="second_desc">
            <p className="desc">{equipment?.desc}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="btns flex w-[25%] justify-between items-center">
            <button className="edit" onClick={viewModal}>o'zgartirish</button>
            <button className="delete" onClick={DeleteEquipment}>o'chirish</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default EquipmendById
