import React, { useEffect, useState } from 'react'
import './style.scss';
import ProfilePicture from '../../assets/images/profilePicture.png';
import { Link, useNavigate } from 'react-router-dom'
import ArrowImg from '../../assets/images/arrow.png'
import CustomerManage from '../../components/customer_manage';
import axios from 'axios';
import RightHeader from '../../components/right-header';
import toast from 'react-hot-toast';



const Customer = () => {
    const navigate = useNavigate();
  document.title = 'Mijozlar'
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const UserDatas= JSON.parse(localStorage.getItem('userDatas'))
  const [searchInput, setSearchInput] = useState('')

const [customers, setCustomers] = useState([])
const [count, setCount] = useState('');
const [totalPages, setTotalPages] = useState(0);
const [currentPage, setCurrentPage] = useState(1);
const limit = 6;

const [isChecked, setIsChecked] = useState(false);

function isCheckedHanlder(e){
  if(e.target.checked){
    setIsChecked(true)
  }else{
    setIsChecked(false)
  }
  console.log(isChecked);
}


async function deleteManyCustomers(){
  if(!customers.length){return }
  try {
    const {data} = await axios.put(`${BACKEND_URL}/users/delete-many`, {
      ids : customers?.map((el, idx)=>el._id)
    }, {headers : {token : UserDatas?.token}})
    if(data.success){
     toast.success(data.message)
     GetCustomers()
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

async function GetCustomers(){
  try {
    const {data} = await axios.get(`${BACKEND_URL}/users/customers`, {headers : {token : UserDatas?.token}})
    setCustomers(data.data)
    setCount(data.count);
    setTotalPages(data.totalPages);
  } catch (error) {
    toast.error(error.message)
  }
}

async function searchHandler(value){
  if(!searchInput.length){return}
  try {
    const {data} = await axios.get(`${BACKEND_URL}/users/customers?search=${value}`, {headers : {token : UserDatas?.token}});
    if(data.success){
      setCustomers(data.data)
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
GetCustomers()
}, [])

  return (
    <div className='customers-page page'>
       <div className='header_ flex items-center justify-between'>
    <h3 className='heading_top'>Mijozlar</h3>
    <RightHeader/>
    </div>
      <div className='top  d-flex justify-content-between align-items-center'>
      <input placeholder='🔍 Izlash' onInput={e=>searchHandler(e.target.value)} onChange={e=>setSearchInput(e.target.value)}/>
      <Link to={'/add-customer'} className='text-decoration-none btn add_customer'>+</Link>
      </div>

      <div className='customers_box p-2 mt-5 w-[90%]'>
        <div className='head list-unstyled d-flex '>
         <input type='checkbox' onClick={isCheckedHanlder}/>
         <li className='flex gap-4 items-center'>
       <p>I . O . F</p>  
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       <p>ID</p>  
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       <p>Ustoz</p>  
       <img src={ArrowImg}/>
         </li>
         <li className='flex gap-4 items-center'>
       <p>Boshladi</p>  
       <img src={ArrowImg}/>
         </li>
         <li    className={`${!isChecked ? "d-none" : ""} `}>
          <i onClick={deleteManyCustomers } className='fas fa-trash cursor-pointer'></i>
         </li>
         {/* <li className='flex gap-4 items-center'>
       <p>Muddati</p>  
       <img src={ArrowImg}/>
         </li> */}
        </div>
        <div className='cus_manage_wrp flex flex-column gap-2'>
        {customers.length ? customers.map((el, idx)=>(
            <CustomerManage reload={GetCustomers} user={el} key={idx}/>
        )) : <h2 className='not_found'>Mijozlar mavjud emas</h2>}
            
        </div>
        <div className='bottom p-2 d-flex align-items-center justify-content-between'>
            <p className='pag_txt'>1-6 dan {count}ta</p>
            <div className='buttons me-5'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`${number === currentPage ? "active" : ""}`}
              >
                {number}
              </button>
            )
          )}
            </div>
          </div>
        {/* <div className='bottom flex items-center justify-between'>
            <button className='prev'>avvalgisi</button>
            <p className='pag_txt'>sahifa 1 dan 10</p>
            <button className='next'>keyingisi</button>
        </div> */}
      </div>
    </div>
  )
}

export default Customer
