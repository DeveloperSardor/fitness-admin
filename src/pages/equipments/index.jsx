import React, { useEffect } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import ProfilePicture from '../../assets/images/profilePicture.png';
import EquipmentCard from '../../components/equipment-card';
import RightHeader from '../../components/right-header';
import { useState } from 'react';
import axios from 'axios';
import Skeleton from '../../components/skeleton';
import toast from 'react-hot-toast';



const Equipments = () => {
    document.title = 'Jihozlar'
    const navigate = useNavigate();


    const [equipments, setEquipments] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const limit = 6;
    const [count, setCount] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const userDatas = JSON.parse(localStorage.getItem("userDatas"));
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [equipmentLoad, setEquipmentLoad] = useState();
    
    async function GetEquipments(){
      try {
        setEquipmentLoad(true);
        const {data} = await axios.get(`${BACKEND_URL}/products/equipments?page=${currentPage}`, 
        {headers : {token : userDatas?.token}}
        )
        if(data.success){
        setEquipments(data.data);
        setCount(data.count)
        setTotalPages(data.totalPages);
        }else{
          throw new Error(data.message)
        }
      } catch (error) {
        toast.error(error.message);
      }finally {
        setEquipmentLoad(false);
      }
    }
    
    
    async function searchHandler(value){
      if(!searchInput.length){return}
      try {
        const {data} = await axios.get(`${BACKEND_URL}/products/equipments?search=${value}`, {headers : {token : userDatas?.token}});
        if(data.success){
          setEquipments(data.data)
        }else{
          throw new Error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    
    
    
    
    useEffect(()=>{
    GetEquipments()
    },[currentPage])
    
    


  return (
    <div className='equipments-page page'>
        <div className='header_ flex items-center justify-between'>
    <h3 className='heading_top'>Jihozlar</h3>
   <RightHeader/>
    </div>
      <div className='top  d-flex justify-content-between align-items-center'>
      <input placeholder='🔍 Izlash' onInput={e=>searchHandler(e.target.value)} onChange={e=>setSearchInput(e.target.value)}/>
      <Link to={'/add-equipment'} className='text-decoration-none btn add_eq'>+</Link>
      </div>


      <div className='eqs_wrp mt-4 flex-wrap flex justify-between items-center'>

      {!equipments?.length ? (
          <h2 className="not_found">Jihozlar mavjud emas!</h2>
        ) : (
          ""
        )}
        {equipmentLoad ? <Skeleton/> : ""}
        {equipments.length ?
          equipments?.map((el, idx) => <EquipmentCard key={idx} equipment={el} reload={GetEquipments} />) : ""}
       
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
    </div>
  )
}

export default Equipments
