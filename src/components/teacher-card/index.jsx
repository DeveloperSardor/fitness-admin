import React from 'react'
import './style.scss'
import editImg from '../../assets/images/edit.png'
import deleteImg from '../../assets/images/delete.png'
import TeacherImg from '../../assets/images/teacher.png';
import UserIcon from '../../assets/images/user-icon.png';
import CalendarIcon from '../../assets/images/teacher-need-2.png';
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import context from "../../context";


const TeacherCard = ({teacher, reload}) => {
  const contextDatas = useContext(context);
  const {isOpenEditModal, setIsOpenEditModal, defaultData, setDefaultData} = contextDatas;
    const navigate = useNavigate();
    const userDatas = JSON.parse(localStorage.getItem('userDatas'))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


    function viewModal(){
      setIsOpenEditModal(!isOpenEditModal)
      setDefaultData(teacher)
     }

     
async function deleteTeacher(){
  try {
    const {data} = await axios.delete(`${BACKEND_URL}/users/delete/${teacher?._id}`, {headers : {token : userDatas?.token}})
    if(data.success){
      reload()
      toast.success(data.message)
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}




  return (
    <div className='teacher-card p-2 py-3'>
      <div className='btns  d-flex align-items-center gap-3'>
        <img src={editImg} onClick={viewModal} className='cursor-pointer'/>
        <img src={deleteImg} onClick={deleteTeacher} className='cursor-pointer'/>
      </div>
      <div className='body ps-5 flex flex-column gap-2'>
      <img  src={teacher?.img} className='teacher_img cursor-pointer' onClick={()=>navigate(`/teachers/${teacher._id}`)}/>
      <h4 className='name'>{teacher?.lastname} {teacher?.firstname}</h4>
      <p className='_id'>ID {teacher?._id}</p>
      </div>
      <div className='bottom d-flex px-2 align-items-center justify-content-between'>
        <div className='category d-flex gap-2 align-items-center'>
         <img src={UserIcon} alt='user icon' className='cat_img'/>
         <div className='ct_txt d-flex flex-column gap-1'>
            <p className='string'>Toifa</p>
            <p className='number'>{teacher.category == 'birinchi' ? "I" : teacher.category == 'ikkinchi' ? "II" : teacher.category =='uchinchi' ? "III" : "IV"}</p>
         </div>
        </div>
        <div className='days flex gap-2'>
        <img src={CalendarIcon} alt='calendar icon' className='day_img'/>
         <div className='day_txt d-flex flex-column gap-1'>
            <p className='string'>kuni</p>
            <p className='sepay'> {teacher?.days == "toq"
                        ? "Du Chor Ju"
                        : "Se Pay Sha"}</p>
         </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherCard
