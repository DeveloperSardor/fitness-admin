import React, { useState, useRef, useEffect } from "react";
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import { useNavigate } from "react-router-dom";
import RightHeader from "../../components/right-header";
import toast from "react-hot-toast";
import axios from "axios";

const AddEquipment = () => {
  const navigate = useNavigate();
const userDatas = JSON.parse(localStorage.getItem('userDatas'));
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 async function AddEquipmentHandler(){

   if (!titleRef.current.value.trim().length) {
     return toast.error(`Jihozning nomini kiriting`);
    } else if (!companyRef.current.value.trim().length) {
      return toast.error(`Jihozning brendini kiriting`);
    }else if (!countRef.current.value.trim().length) {
      return toast.error(`Jihozning sonini kiriting`);
    }
    else if (!priceRef.current.value.trim().length) {
      return toast.error(`Jihozning narxini kiriting`);
    }
    else if (!categoryRef.current.value.trim().length) {
      return toast.error(`Jihozning turini kiriting`);
    }
    else if (!img.trim().length) {
      return toast.error(`Jihoz uchun rasm yuklang`);
    }
    
    try {
      const {data} = await axios.post(`${BACKEND_URL}/products/add-equipment`, {
        title : titleRef.current.value,
        company : companyRef.current.value,
        category : categoryRef.current.value,
        img : img,
        count : countRef.current.value,
        desc : descRef.current.value,
        price : priceRef.current.value
      },{headers : {token : userDatas?.token}})
      if(data.success){
       toast.success(data.message);
       navigate(`/equipments`)
      }else{
        throw new Error(data.message)
      }
  } catch (error) {
    toast.error(error.message)
  }
 }

  // states
  const [imgLoad, setImgLoad] = useState(false);
  const [img, setImg] = useState("");

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

  // refs
  const titleRef = useRef();
  const companyRef = useRef();
  const descRef = useRef();
  const countRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  document.title = "Jihoz qo'shish";
  return (
    <div className="add-equipment-page page">
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Yangi Jihoz qo'shish</h3>
        <RightHeader />
      </div>

      <section className="add_box">
        <div className="top_head">
          <h3 className="headings">Jihoz ma'lumotlari</h3>
        </div>
        <div className="main_wrp p-2 px-5 mt-3 flex gap-4">
          <div className="left w-[45%] flex flex-column gap-3">
            <label className="flex flex-column gap-2 item">
              Nomi *
              <input ref={titleRef} placeholder="Trinajor runner" />
            </label>
            <label className="flex flex-column gap-2 item">
              Brand *
              <input ref={companyRef} placeholder="Adidas" />
            </label>
            <label className="flex flex-column gap-2 item">
              Ma'lumot *
              <textarea
                ref={descRef}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
              ></textarea>
            </label>
            <label className="flex flex-column gap-2 item">
              Soni *
              <input ref={countRef} placeholder="0" type="number" />
            </label>
          </div>
          <div className="right w-[45%] flex flex-column gap-3">
            <label className="flex flex-column gap-2 item">
              Narxi *
              <input ref={priceRef} placeholder="150" type="number" />
            </label>
            <label className="flex flex-column gap-2 item">
              Turi *
              <input placeholder="Protein" ref={categoryRef} />
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
          </div>
        </div>
        <div className="bottom">
          <div className="btns flex w-[25%] justify-between items-center">
            <button className="add" onClick={AddEquipmentHandler}>qo'shish</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddEquipment;
