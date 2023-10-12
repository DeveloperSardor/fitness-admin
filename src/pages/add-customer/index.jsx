import React, { useRef, useState, useEffect } from "react";
import "./style.scss";
import ProfilePicture from "../../assets/images/profilePicture.png";
import { useNavigate } from "react-router-dom";
import RightHeader from "../../components/right-header";
import toast from "react-hot-toast";
import axios from "axios";

const AddCustomer = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  document.title = "Mijoz qo'shish";
  const [teachers, setTeachers] = useState([]);

  async function GetTeachers() {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/users/teachers`, {
        headers: { token: userDatas?.token },
      });
      if (data.success) {
        setTeachers(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function AddCustomerHandler() {
   
    if (!firstnameRef.current.value.trim().length) {
      return toast.error(`Mijozning ismini kiriting`);
    } else if (!lastnameRef.current.value.trim().length) {
      return toast.error(`Mijozning familiyasini kiriting`);
    } else if (!phoneRef.current.value.trim().length) {
      return toast.error(`Mijozning telefon raqamini kiriting`);
    } else if (!gmailRef.current.value.trim().length) {
      return toast.error(`Mijozning gmaili kiriting`);
    } else if (!birthDateRef.current?.value.length) {
      return toast.error(`Mijozning tug'ulgan sanasini kiriting`);
    } else if (!genderRef.current.value.length) {
      return toast.error(`Mijozning jinsini kiriting`);
    }else if(!servicePriceRef.current.value.trim().length){
      return toast.error(`Oylik xizmat narxni kiriting`);
    }else if(!teacherRef.current.value.length){
      return toast.error(`Mijoz uchun ustoz kiriting`);
    }
      const dayTeacher = teachers?.find(el=>el._id == teacherRef.current.value) 
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/users/add-customer`,
        {
          firstname: firstnameRef.current.value.trim(),
          lastname: lastnameRef.current.value.trim(),
          phone: phoneRef.current.value.trim(),
          gmail: gmailRef.current.value.trim(),
          gender: genderRef.current.value,
          birth_date: birthDateRef.current.value,
          service_price : servicePriceRef.current.value.trim(),
          teacher : teacherRef.current.value,
          days : dayTeacher.days,
          img: img,
        },
        { headers: { token: userDatas?.token } }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/customers");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // refs
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const phoneRef = useRef();
  const gmailRef = useRef();
  const birthDateRef = useRef();
  const daysRef = useRef();
  const genderRef = useRef();
  const teacherRef = useRef();
  const servicePriceRef = useRef();

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

  useEffect(() => {
    GetTeachers();
  }, []);

  return (
    <div className="add-customer-page page">
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Yangi mijoz qo'shish</h3>
        <RightHeader />
      </div>

      <section className="add_box">
        <div className="top_head">
          <h3 className="headings">Mijoz ma'lumotlari</h3>
        </div>
        <div className="main_wrp p-2 px-5 mt-3 flex gap-4">
          <div className="left w-[45%] flex flex-column gap-3">
            <label className="flex flex-column gap-2 item">
              Ismi *
              <input placeholder="John" ref={firstnameRef}/>
            </label>
            <label className="flex flex-column gap-2 item">
              Tug'ilgan sana *
              <input type="date" ref={birthDateRef}/>
            </label>
            <label className="flex flex-column gap-2 item">
              Telefon raqami *
              <input ref={phoneRef} placeholder="941234567" />
            </label>
            <label className="flex flex-column gap-2 item">
              Gmail *
              <input ref={gmailRef} placeholder="demo@gmail.com" type="email" />
            </label>
            <label className="flex flex-column gap-2 item">
              Jins *
              <select ref={genderRef} className="form-select">
                <option value={'erkak'}>Erkak</option>
                <option value={'ayol'}>Ayol</option>
              </select>
            </label>

          </div>
          <div className="right w-[45%] flex flex-column gap-3">
            <label className="flex flex-column gap-2 item">
              Sharif *
              <input ref={lastnameRef} placeholder="Jalilov" />
            </label>
            <label className="flex flex-column gap-2 item">
              Xizmat *
              <input ref={servicePriceRef} type="number" placeholder="0" />
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
              Ustoz *
              <select ref={teacherRef} className="form-select">
                {teachers?.map((el, idx) => (
                  <option value={el._id}>
                    {el.lastname} {el.firstname}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="bottom">
          <div className="btns flex w-[25%] justify-between items-center">
            <button className="add" onClick={AddCustomerHandler}>qo'shish</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddCustomer;
