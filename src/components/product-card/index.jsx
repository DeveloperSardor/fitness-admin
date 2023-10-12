import React from 'react'
import './style.scss'
import productImg from '../../assets/images/product.png'
import deleteIcon from '../../assets/images/delete.png'
import editIcon from '../../assets/images/edit.png'
import toast from 'react-hot-toast'
import axios from 'axios'
import context from '../../context'
import { useContext } from 'react'
import {useNavigate}  from 'react-router-dom'

const ProductCard = ({product, reload}) => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  const contextDatas = useContext(context);
  const {
    isOpenEditProduct,
    setIsOpenEditProduct,
    defaultDataProduct,
    setDefaultDataProduct,
  } = contextDatas;


  function viewModal(){
    setIsOpenEditProduct(!isOpenEditProduct)
    setDefaultDataProduct(product)
   }

async function deleteProduct(){
  try {
    const {data} = await axios.delete(`${BACKEND_URL}/products/delete-product/${product._id}`, {headers : {token : userDatas?.token}})
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
    <div className='product-card position-relative p-2 pb-5'>
      <img src={product?.img}  alt='product image' className='main_img cursor-pointer rounded w-[310px] h-[250px]' onClick={()=>navigate(`/products/${product._id}`)}/>
      <div className='datas mt-1'>
        <div className='item flex items-center justify-between'>
            <p className='title'>{product?.title}</p>
            <p className='company'>{product?.company}</p>
        </div>
        <div className='item flex items-center justify-between'>
            <p className='category'>{product?.category}</p>
            <p className='price'>{product?.price} $</p>
        </div>
      </div>
      <div className='btns mt-2  position-absolute flex gap-4 items-center'>
            <img src={deleteIcon} className='del' onClick={deleteProduct}/>
            <img src={editIcon} className='edit' onClick={viewModal}/>
        </div>
    </div>
  )
}

export default ProductCard
