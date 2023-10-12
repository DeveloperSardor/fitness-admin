import React, { useRef, useState } from 'react'
import './style.scss'
import { useContext } from 'react'
import context from '../../context'
import toast from 'react-hot-toast';
import axios from 'axios'

const EditModalProduct = ({product}) => {
    const UserDatas = JSON.parse(localStorage.getItem('userDatas'))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
     const titleRef = useRef()
     const companyRef = useRef()
     const categoryRef = useRef()
     const countRef = useRef()
     const descRef = useRef()
     const priceRef = useRef()
    const contextDatas = useContext(context);
    const {isOpenEditProduct, setIsOpenEditProduct} = contextDatas;
    const [imgLoad,setImgLoad] = useState(false)
 const [isUploaded, setIsUploaded] = useState(false)
     const [img, setImg] = useState(null)


    function viewModal(){
        setIsOpenEditProduct(false)
       }




       async function editProduct(e){
        e.preventDefault()
        if(!titleRef.current.value.trim().length){
         return toast.error(`Nomini kiriting`)
        }else if(!companyRef.current.value.trim().length){
          return toast.error(`Kompaniyasini  kiriting`)
        }else if(!categoryRef.current.value.trim().length){
          return toast.error(`Kategoriyasini kiriting`)
        }else if(!countRef.current.value.trim().length){
          return toast.error(`Sonini kiriting`)
        }
        else if(!priceRef.current.value.trim().length){
          return toast.error(`Narxini kiriting`)
        }
        try {
            const {data} = await axios.put(`${BACKEND_URL}/products/edit-product/${product?._id}`, {
               title : titleRef.current.value.trim(),
               company : companyRef.current.value.trim(),
               category : categoryRef.current.value.trim(),
               count : countRef.current.value.trim(),
               desc : descRef.current.value.trim(),
               price : priceRef.current.value.trim(),
               img : img
            }, {headers : {token : UserDatas?.token}})
            if(data.success){
              toast.success(`Muvofaqqiyatli o'zgartirildi`)
              viewModal()
              location.reload()
            }else {
              throw new Error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
       }
        

       const uploadAva = async (pics) => {
        let type = pics.type.substring(pics.type.length - 3);
        if (pics && pics.type.split("/")[0] != "image") {
          return toast.error(t("invalidFile"));
        }
        if (pics && (type == "png" || "jpg" || "svg")) {
          try {
            setImgLoad(true);
            const formDatas = new FormData();
            formDatas.append("file", pics);
            formDatas.append("upload_preset", "chat-app");
            const { data } = await axios.post(
              `https://api.cloudinary.com/v1_1/roadsidecoder/image/upload`,
              formDatas
              );
              setImg(data.url);
              setIsUploaded(true)
              toast.success();
            } catch (err) {
              toast.error(err.message);
            } finally {
              setImgLoad(false);
            }
          }
        };

       
  return (
    <>

<div id="modal" class={`modal ${isOpenEditProduct ? "d-block" : "d-none"}`}>
  <div class="modal-content">
    <span id="closeModal w-[9%]" onClick={()=>viewModal()} class="close">&times;</span>
    <div className='wrp w-[90%] flex flex-column gap-3 mx-auto'>
    <h2 >Maxsulotni o'zgartirish</h2>
    <form onSubmit={editProduct} className='flex flex-column gap-2'>
    <label className="custom-upload">
           {imgLoad ? <div className="flex  my-1 items-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div> : isUploaded ? <>✅ Rasm yuklandi <span className='text-primary cursor-pointer'>o'zgartirish</span></>  :  <><i className='fas fa-plus'></i>
                <img src={product?.img}   className="cursor-pointer w-[100px] h-[95px] rounded"/></> }
           
              <input
                className="d-none"
                type="file"
                accept="image/*"
                onChange={(e) => uploadAva(e.target.files[0])}
              />
              <b className="ms-2"></b>
            </label>
        <input ref={titleRef} placeholder='Maxsulot nomi' className='form-control' defaultValue={product?.title}/>
        <input ref={companyRef} placeholder='Kompaniya nomi' className='form-control' defaultValue={product?.company}/>
        <input ref={categoryRef} placeholder="Maxsulot turi" className='form-control' defaultValue={product?.category}/>
        <input ref={countRef} placeholder='Maxsulot soni' className='form-control' defaultValue={product?.count}/>
        <input ref={descRef} placeholder='Tavsif' className='form-control' defaultValue={product?.desc}/>
        <input ref={priceRef} placeholder='Narxi' className='form-control' defaultValue={product?.price}/>
       
        <button className='btn btn-info text-light mt-2'>O'zgartirish</button>
    </form>
    </div>
  </div>
</div>
    </>
  )
  }

export default EditModalProduct
