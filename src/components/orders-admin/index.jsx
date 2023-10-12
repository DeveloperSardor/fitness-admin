import React from 'react'
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import customerImg from '../../assets/images/customer.png';
import './style.scss'
import toast from 'react-hot-toast';
import axios from 'axios';

const OrdersViewAdmin = ({order, reload}) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userDatas = JSON.parse(localStorage.getItem('userDatas'))
  function convertToRealTime(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

async function AddToReached(){
  try {
    const {data} = await axios.put(`${BACKEND_URL}/orders/isReached/${order?._id}`, {}, {headers : {token : userDatas?.token}})
    if(data.success){
      toast.success(`Yetkazib berilgan buyurtmalar qatoriga qo'shildi`)
      reload()
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

  return (
    <div className='order_box '>
      <div className='all_contents w-[80%] flex items-center justify-between'>
       <div className='left flex items-center gap-4'>
        <input type='checkbox' className='checkbox'/>
        <div className='cus_info flex items-center gap-5'>
         <img src={order?.user?.img} alt='customer img' className='rounded w-[40px] h-[40px]'/>
         <div className='name_phone flex flex-column gap-1'>
            <p className='name'>{order?.user.lastname} {order?.user.firstname}</p>
            <p className='phone'>+998{order?.user.phone}</p>
         </div>
        </div>
        {/* <p className="product_name">Trinajor runner</p> */}
        <p className='all_price ms-5'>{order?.totalSum}$</p>
        <p className='start_date ms-5'>{convertToRealTime(order?.createdAt)}</p>
        <p className='count ms-5'>1</p>
       </div>
       <div className='right flex items-center gap-2'>
           <img src={deleteIcon} onClick={AddToReached} className='cursor-pointer'/>
           {/* <img src={editIcon}/> */}
       </div>
      </div>
    </div>
  )
}

export default OrdersViewAdmin
