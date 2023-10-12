import React, { useRef, useState } from "react";
import ProfilePicture from "../../assets/images/profilePicture.png";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import RightHeader from "../../components/right-header";
import toast from "react-hot-toast";
import axios from "axios";


const AddTeacher = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userDatas = JSON.parse(localStorage.getItem('userDatas'))

  // refs
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phoneRef = useRef();
  const categoryRef = useRef();
  const infoRef = useRef();
  const gmailRef = useRef();
  const birthDateRef = useRef();
  const daysRef = useRef();
  const genderRef = useRef();


  // states
  const [imgLoad, setImgLoad] = useState(false);
  const [img, setImg] = useState("");

  document.title = "Ustoz qo'shish";



async function addTeacherHandler(){
    if(!firstnameRef.current.value.trim().length){
       return toast.error(`Ustozning ismini kiriting`)
    }else if(!lastnameRef.current.value.trim().length){
       return toast.error(`Ustozning familiyasini kiriting`)
    }else if(!phoneRef.current.value.trim().length){
       return toast.error(`Ustozning telefon raqamini kiriting`)
    }else if(!gmailRef.current.value.trim().length){
       return toast.error(`Ustozning gmaili kiriting`)
    }else if(!categoryRef.current.value.trim().length){
       return toast.error(`Ustozning toifasini kiriting`)
    }else if(!birthDateRef.current.value.trim().length){
       return toast.error(`Ustozning tug'ulgan sanasini kiriting`)
    }else if(!daysRef.current.value.trim().length){
       return toast.error(`Ustozning ish kunlarini kiriting`)
    }else if(!genderRef.current.value.trim().length){
       return toast.error(`Ustozning jinsini kiriting`)
    }
    try {
        const {data} = await axios.post(`${BACKEND_URL}/users/add-teacher`, {
        firstname : firstnameRef.current.value.trim(),
        lastname : lastnameRef.current.value.trim(),
        phone : phoneRef.current.value.trim(),
        gmail : gmailRef.current.value.trim(),
        info : infoRef.current.value.trim(),
        gender : genderRef.current.value.trim(),
        birth_date : birthDateRef.current.value.trim(),
        days : daysRef.current.value.trim(),
        category : categoryRef.current.value.trim(),
        img : img
        }, {headers : {token : userDatas?.token}})
        if(data.success){
          toast.success(data.message)
          navigate('/teachers')
        }else{
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
        toast.success();
      } catch (err) {
        toast.error(err.message);
      } finally {
        setImgLoad(false);
      }
    }
  };

  return (
    <div className="add-teacher-page page">
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Yangi Ustoz qo'shish</h3>
        <RightHeader />
      </div>

      <section className="add_box">
        <div className="top_head">
          <h3 className="headings">Ustoz ma'lumotlari</h3>
        </div>
        <div className="main_wrp p-2 px-5 mt-3 flex gap-4">
          <div className="left w-[45%] flex flex-column gap-3">
            <label className="flex flex-column gap-2 item">
              Ism *
              <input placeholder="Maria" ref={firstnameRef} />
            </label>
            <label className="flex flex-column gap-2 item">
              Telefon raqami *
              <input placeholder="941234567" ref={phoneRef} />
            </label>
            <label className="flex flex-column gap-2 item">
              Ma'lumot *
              <textarea
                ref={infoRef}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
              ></textarea>
            </label>
            <label className="flex flex-column gap-2 item">
              Gmail *
              <input ref={gmailRef} placeholder="demo@gmail.com" />
            </label>
            <label className="flex flex-column gap-2 item">
              Tug'ilgan sanasi *
              <input ref={birthDateRef} type="date" />
            </label>
          </div>
          <div className="right w-[45%] flex flex-column gap-3">
            <label className="flex flex-column gap-2 item">
              Sharifi *
              <input placeholder="Historia" ref={lastnameRef} />
            </label>
            <label className="flex flex-column gap-2 item">
              Toifa *
              <select className="form-select" ref={categoryRef}>
                <option value={"birinchi"}>Birinchi toifa</option>
                <option value={"ikkinchi"}>Ikkinchi toifa</option>
                <option value={"uchinchi"}>Uchinchi toifa</option>
                <option value={"to'rtinchi"}>To'rtinchi toifa</option>
              </select>
            </label>
            <label className="flex flex-column gap-2 item">
              rasmi *
              <label className="custom-upload">
                <input
                  className="d-none"
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadAva(e.target.files[0])}
                />
                <div className="drag cursor-pointer">
                  {imgLoad ? (
                    <div className="flex justify-center my-1 items-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    `Drag and drop or 
click here to select file`
                  )}
                </div>
              </label>
            </label>
            <label className="flex flex-column gap-2 item">
              kuni *
              <select className="form-select" ref={daysRef}>
                <option value={"toq"}>Toq kunlar</option>
                <option value={"juft"}>Juft kunlar</option>
              </select>
            </label>
            <label className="flex flex-column gap-2 item">
              Jinsi *
              <select className="form-select" ref={genderRef}>
                <option value={"erkak"}>erkak</option>
                <option value={"ayol"}>ayol</option>
              </select>
            </label>
          </div>
        </div>
        <div className="bottom">
          <div className="btns flex w-[25%] justify-between items-center">
            {/* <button className="save">saqlash</button> */}
            <button className="add" onClick={addTeacherHandler}>qo'shish</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddTeacher;
