import React from 'react'
import './style.scss'
import EquipmentImg from '../../assets/images/equipment.png';
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import context from "../../context";
import toast from 'react-hot-toast';
import axios from 'axios';


const EquipmentCard = ({equipment, reload}) => {
  const navigate = useNavigate();
  const userDatas = JSON.parse(localStorage.getItem('userDatas'))
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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


   async function deleteEquipment(){
    try {
      const {data} = await axios.delete(`${BACKEND_URL}/products/delete-product/${equipment?._id}`, {headers : {token :userDatas?.token }})
    if(data.success){
      toast.success(data.message)
    reload()
    }else{
      throw new Error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
   }


  return (
    <div className='equipment-card p-2  pb-3 position-relative cursor-pointer'  >
      <div className='body  rounded bg-light'>
        <div className='btns position-absolute flex gap-4 items-center'>
            <img src={deleteIcon} onClick={deleteEquipment} className='del'/>
            <img src={editIcon} className='edit' onClick={viewModal}/>
        </div>
        <img src={equipment?.img} onClick={()=>navigate(`/equipments/${equipment._id}`)} alt='equipment' className='main_img'/>
      </div>
      <div className='eq_info flex mt-1 flex-column gap-1'>
         <div className='item flex justify-between items-center'>
         <p className='title'>{equipment?.title}</p>
            <p className='company'>{equipment?.company}</p>
         </div>
         <div className='item flex justify-between items-center'>
         <p className='for'>{equipment?.category}</p>
            <p className='price'>{equipment?.price} $</p>
         </div>
      </div>
    </div>
  )
}

export default EquipmentCard
