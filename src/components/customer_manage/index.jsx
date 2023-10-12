import React, { useEffect, useState } from 'react'
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import customerImg from '../../assets/images/customer.png';
import './style.scss'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useContext } from "react";
import context from "../../context";

const CustomerManage = ({user, reload}) => {
  const contextDatas = useContext(context);
  const {isOpenEditModal, setIsOpenEditModal, defaultData, setDefaultData} = contextDatas;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const UserDatas= JSON.parse(localStorage.getItem('userDatas'))
const [teacher, setTeacher]  = useState(null)
  function viewModal(){
    setIsOpenEditModal(!isOpenEditModal)
    setDefaultData(user)
   }


   
   async function  GetTeacher(id){
    try {
      const {data} = await axios.get(`${BACKEND_URL}/users/teachers/${id}`, {headers : {token : UserDatas?.token}})
      if(data.success){
        setTeacher(data.data)
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  function convertToRealTime(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  async function deleteById(){
    try {
      const {data} =await axios.delete(`${BACKEND_URL}/users/delete/${user?._id}`, {headers : {token : UserDatas?.token}})
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


  useEffect(()=>{
     GetTeacher(user?.teacher)
  }, [])

  return (
    <div className='customer_manage '>
      <div className='all_contents w-[80%] flex items-center justify-between'>
       <div className='left flex items-center gap-4'>
        <input type='checkbox' className='checkbox'/>
        <div className='cus_info flex items-center gap-2'>
         <img src={user?.img} alt='customer img' className='rounded w-[40px] h-[40px]'/>
         <div className='name_phone flex flex-column gap-1'>
            <p className='name'>{user?.lastname} {user?.firstname}</p>
            <p className='phone'>+99894{user?.phone}</p>
         </div>
        </div>
        <p className="_id">{user?._id}</p>
        <p className='teacher_name'>{teacher?.lastname} {teacher?.firstname}</p>
        <p className='start_date'>{convertToRealTime(user?.createdAt)}</p>
        {/* <p className='life_time ms-5'>3</p> */}
       </div>
       <div className='right flex items-center gap-2'>
           <img className='cursor-pointer' src={deleteIcon} onClick={()=>deleteById()}/>
           <img className='cursor-pointer' src={editIcon} onClick={viewModal}/>
       </div>
      </div>
    </div>
  )
}

export default CustomerManage
