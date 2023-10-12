import React from 'react'
import './style.scss'
import ProfilePicture from '../../assets/images/profilePicture.png';
import UserIcon from '../../assets/images/icon.png'
import DotsImg from '../../assets/images/Dots.png'


const TeacherInfoBox = ({teacher}) => {
  return (
    <div className='box_teacher box d-flex align-items-center justify-content-between'>
    <div className='img_name d-flex align-items-center gap-3'>
     <img src={teacher?.img} alt='Profile Image' className='profile_pciture'/>
     <p className='name'>{teacher?.lastname} {teacher?.firstname}</p>
    </div>
    <p className='_id'>ID {teacher._id}</p>
    <div className='category d-flex align-items-center gap-2'>
     <img src={UserIcon} alt='User Icon' className='cat_img'/>
     <div className='txts d-flex flex-column gap-1'>
       <p className='string'>Toifa</p>
       <p className="number">{teacher?.category == 'birinchi' ? "I" : teacher?.category == 'ikkinchi' ? "II" : teacher?.category =='uchinchi' ? "III" : "IV"}</p>
     </div>
    </div>
    <div className='days text-capitalize'>{teacher?.days} </div>
    {/* <img src={DotsImg} alt='dots' className='dots'/> */}
   </div>
  )
}

export default TeacherInfoBox
