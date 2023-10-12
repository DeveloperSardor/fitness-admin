import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { useContext } from 'react'
import context from '../../context'
import toast from 'react-hot-toast';
import axios from 'axios'

const EditModal = ({user}) => {
    const UserDatas = JSON.parse(localStorage.getItem('userDatas'))
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
     const firstnameRef = useRef()
     const lastnameRef = useRef()
     const gmailRef = useRef()
     const phoneRef = useRef()
     const birthDateRef = useRef()
     const genderRef = useRef()
     const categoryRef = useRef()
     const daysRef = useRef()
     const [imgLoad,setImgLoad] = useState(false)
     const contextDatas = useContext(context);
     const [isUploaded, setIsUploaded] = useState(false)
     const [img, setImg] = useState(null)
     const {isOpenEditModal, setIsOpenEditModal} = contextDatas;



     function viewModal(){
        setIsOpenEditModal(false)
      }
      
       function convertToRealTime(isoDate) {
         const date = new Date(isoDate);
         const year = date.getFullYear();
         const month = String(date.getMonth() + 1).padStart(2, "0");
         const day = String(date.getDate()).padStart(2, "0");
         const formattedDate = `${year}-${month}-${day}`;
         return formattedDate;
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
          
          
          async function editUser(e){
            e.preventDefault()
            if(!firstnameRef.current.value.trim().length){
              return toast.error(`Ism kiriting`)
            }else if(!lastnameRef.current.value.trim().length){
          return toast.error(`Familiya kiriting`)
        }else if(!gmailRef.current.value.trim().length){
          return toast.error(`Gmail kiriting`)
        }else if(!phoneRef.current.value.trim().length){
          return toast.error(`Telefon raqam kiriting`)
        }else if(!birthDateRef.current.value.trim().length){
          return toast.error(`Tug'ilgan sana kiriting`)
        }else if(!genderRef.current.value.trim().length){
          return toast.error(`Jinsni kiriting`)
        }else if(!categoryRef.current.value.trim().length){
          return toast.error(`Toifa kiriting`)
        }else if(!daysRef.current.value.trim().length){
          return toast.error(`Kunni kiriting`)
        }
        try {
            const {data} = await axios.put(`${BACKEND_URL}/users/edit/${user?._id}`, {
               firstname : firstnameRef.current.value.trim(),
               lastname : lastnameRef.current.value.trim(),
               gmail : gmailRef.current.value.trim(),
               phone : phoneRef.current.value.trim(),
               birth_date : birthDateRef.current.value.trim(),
               gender : genderRef.current.value.trim(),
               category : categoryRef.current.value.trim(),
               days : daysRef.current.value.trim(),
               img : img,
              }, {headers : {token : UserDatas?.token}})
              if(data.success){
              toast.success(`Muvofaqqiyatli o'zgartirildi`)
              viewModal()
              if(UserDatas?._id == data.data._id){
                localStorage.setItem('userDatas', JSON.stringify({...data.data, token : UserDatas?.token}))
              }
              location.reload()
            }else {
              throw new Error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        }

        useEffect(()=>{
          setImg(user?.img)
        }, [])
        
  return (
    <>


<div id="modal" class={`modal ${isOpenEditModal ? "d-block" : "d-none"}`}>
  <div class="modal-content">
    <span id="closeModal w-[9%]" onClick={()=>viewModal()} class="close">&times;</span>
    <div className='wrp w-[90%] flex flex-column gap-3 mx-auto'>
    <h2 >Ustozni o'zgartirish</h2>
    <form onSubmit={editUser} className='flex flex-column gap-2'>
           <label className="custom-upload">
           {imgLoad ? <div className="flex  my-1 items-center">
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    </div> : isUploaded ? <>✅ Rasm yuklandi <span className='text-primary cursor-pointer'>o'zgartirish</span></>  :  <><i className='fas fa-plus'></i>
                <img src={user?.img}   className="cursor-pointer w-[100px] h-[95px] rounded"/></> }
           
              <input
                className="d-none"
                type="file"
                accept="image/*"
                onChange={(e) => uploadAva(e.target.files[0])}
              />
              <b className="ms-2"></b>
            </label>
        <input ref={firstnameRef} placeholder='Omar' className='form-control' defaultValue={user?.firstname}/>
        <input ref={lastnameRef} placeholder='Usmonov' className='form-control' defaultValue={user?.lastname}/>
        <input ref={birthDateRef} placeholder="Tug'ilgan sana" className='form-control' type='date' defaultValue={convertToRealTime(user?.birth_date)}/>
        <input ref={gmailRef} placeholder='demo@gmail.com' className='form-control' defaultValue={user?.gmail}/>
        <input ref={phoneRef} placeholder='941234567' className='form-control' defaultValue={user?.phone}/>
        <select ref={genderRef} className='form-select' defaultValue={user?.gender}>
            <option value={'erkak'}>Erkak</option>
            <option value={'ayol'}>Ayol</option>
        </select>
        <select ref={categoryRef} className='form-select' defaultValue={user?.category}>
            <option value={'birinchi'}>Birinchi</option>
            <option value={'ikkinchi'}>Ikkinchi</option>
            <option value={'uchinchi'}>Uchinchi</option>
            <option value={"to'rtinchi"}>To'rtinchi</option>
        </select>
        <select ref={daysRef} className='form-select' defaultValue={user?.days}>
            <option value={'toq'}>Toq</option>
            <option value={'juft'}>Juft</option>
        </select>
        <button className='btn btn-info text-light mt-2'>O'zgartirish</button>
    </form>
    </div>
  </div>
</div>
    </>
  )
}

export default EditModal
