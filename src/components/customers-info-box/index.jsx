import React, { useEffect, useState } from 'react'
import './style.scss'
import ProfilePicture from '../../assets/images/profilePicture.png';
import toast from 'react-hot-toast';
import axios from 'axios';


const CustomersInfoBox = ({customer}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [teacher, setTeacher] = useState(null)

const UserDatas = JSON.parse(localStorage.getItem('userDatas'))

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

useEffect(()=>{
GetTeacher(customer?.teacher)
}, [])

  return (
    <div className='box customer_info_box d-flex align-items-center justify-content-between'>
    <div className='img_name d-flex align-items-center gap-3'>
     <img src={customer?.img} alt='Profile Image' className='profile_pciture'/>
     <p className='name'>{customer?.lastname} {customer?.firstname}</p>
    </div>
    <p className='teacher'>{teacher?.lastname} {teacher?.firstname}</p>
    <p className='service_price'>{customer?.service_price}</p>
    <div className='days text-capitalize'>{customer?.days}</div>

      
    </div>
  )
}

export default CustomersInfoBox;
