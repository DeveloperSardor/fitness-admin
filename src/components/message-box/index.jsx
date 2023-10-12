import React from 'react'
import './style.scss'
import ProfilePicture from '../../assets/images/profilePicture.png';
import {Link} from 'react-router-dom'
const MessageBox = ({data}) => {
  
  return (
    <Link to={'/question-answer'} className='text-decoration-none message_box box border-bottom d-flex gap-2 align-items-center' >
       <img src={data?.user?.img} alt='Profile Image' className='pro_img'/>
       <div className='name_msg'>
        <p className='name'>{data?.user?.lastname} {data?.user?.firstname}</p>
        <p className='msg'>{data?.user.gmail}</p>
       </div>
       {/* <p className='time'>12:45 PM</p> */}
    </Link>
  )
}

export default MessageBox
