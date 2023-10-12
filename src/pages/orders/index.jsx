import React, { useEffect, useState } from 'react'
import './style.scss'
import ProfilePicture from "../../assets/images/profilePicture.png";
import ArrowImg from '../../assets/images/arrow.png'
import OrdersViewAdmin from '../../components/orders-admin';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import RightHeader from '../../components/right-header';

const Orders = () => {
    const navigate = useNavigate();
   
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
   document.title = 'Buyurtmalar'
   const [orders, setOrders] = useState([])
   const userDatas = JSON.parse(localStorage.getItem('userDatas'))


   async function GetAllOrders(){
    try {
      const {data} =await axios.get(`${BACKEND_URL}/orders/all-orders`, {headers : {token : userDatas?.token}})
      if(data.success){
       setOrders(data.data)
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   }


   useEffect(()=>{
    GetAllOrders()
   }, [])

  return (
    <div className='orders-page page'>
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Buyurtmalar</h3>
        <RightHeader/>
      </div>

      <div className='customers_box p-2 mt-5 w-[90%]'>
        <div className='head list-unstyled d-flex '>
         <input type='checkbox'/>
         <li className='flex gap-4 items-center'>
       <p>I . O . F</p>  
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       {/* <p>Mahsulot</p>   */}
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       <p>Narxi</p>  
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       <p>Vaqti</p>  
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       <p>dona</p>  
       <img src={ArrowImg}/>
         </li>
        </div>
        <div className='cus_manage_wrp flex flex-column gap-2'>
        {orders.length ? orders.map((el, idx)=>(
          <OrdersViewAdmin reload={GetAllOrders} order={el} key={idx}/>
        ))
         : <h2 className='not_found'>Buyurtmalar mavjud emas</h2>}
            
        </div>
       
      </div>


      
    </div>
  )
}

export default Orders
