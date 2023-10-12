import React, { useEffect, useState } from "react";
import "./style.scss";
import Mahsulot from "../../assets/images/mahsulot.png";
import Mijoz from "../../assets/images/mijoz.png";
import Ustoz from "../../assets/images/ustoz.png";
import Jihoz from "../../assets/images/jihoz.png";
import TeacherInfoBox from "../../components/teacher-info-box";
import CustomersInfoBox from "../../components/customers-info-box";
import BellImg from "../../assets/images/bell.png";
import SettingsImg from "../../assets/images/setting.png";
import ProfilePicture from "../../assets/images/profilePicture.png";
import MessageBox from "../../components/message-box";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import RightHeader from "../../components/right-header";


const Home = () => {
const navigate = useNavigate()
const [counts, setCounts] = useState(null)
const UserDatas = JSON.parse(localStorage.getItem("userDatas"));
const limit = 6;
const [chats, setChats] = useState([])
const [teachers, setTeachers] = useState([]);
const [customers, setCustomers] = useState([]);
const [teacherLoad, setTeacherLoad] = useState(false);
const [customerLoad, setCustomerLoad] = useState(false);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const [teacherCurrentPage, setTeacherCurrentPage] = useState(1);
const [teacherTotalPages, setTeacherTotalPages] = useState(0);
const [customerCurrentPage, setCustomerCurrentPage] = useState(1);
const [customerTotalPages, setCustomerTotalPages] = useState(0);
async function getCounts(){
  try {
    const {data} = await axios.get(`${BACKEND_URL}/counts`)
    if(data.success){
      setCounts(data.data)
    }else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
} 

async function fetchConversations (){
  try {
    const {data} = await axios.get(`${BACKEND_URL}/chats`, {headers : {token : UserDatas?.token}})  
    if(data.success){
      setChats(data.data)
    } else{
      throw new Error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}


async function GetTeachers() {
  try {
    setTeacherLoad(true);
    const { data } = await axios.get(
      `${BACKEND_URL}/users/teachers?page=${teacherCurrentPage}`,
      { headers: { token: UserDatas?.token } }
    );
    if (data.success) {
      setTeachers(data.data);
      setTeacherTotalPages(data.totalPages);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setTeacherLoad(false);
  }
}
async function GetCustomers() {
  try {
    setCustomerLoad(true);
    const { data } = await axios.get(
      `${BACKEND_URL}/users/customers?page=${customerCurrentPage}`,
      { headers: { token: UserDatas?.token } }
    );
    if (data.success) {
      setCustomers(data.data);
      setCustomerTotalPages(data.totalPages);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setCustomerLoad(false);
  }
}

useEffect(()=>{
getCounts()
fetchConversations()
}, [])

useEffect(()=>{
GetTeachers()
}, [teacherCurrentPage])


useEffect(()=>{
GetCustomers()
}, [customerCurrentPage])

document.title = 'Forward - Fitness'

  return (
    <div className="home-page d-flex page">
      <main>
        <div className="top d-flex align-items-center justify-content-between">
          <h3 className="title">Dashboard</h3>
          {/* <input placeholder="🔍 Izlash" /> */}
        </div>
        <div className="all-boxes">
          <div className="statistic-box justify-content-between align-items-center d-flex p-3">
            <div className="box d-flex gap-3 align-items-center">
              <img src={Mahsulot} />
              <div className="right d-flex flex-column gap-2">
                <p className="title">Maxsulot</p>
                <p className="count">{counts?.products}</p>
              </div>
            </div>
            <div className="box d-flex gap-3 align-items-center">
              <img src={Mijoz} />
              <div className="right d-flex flex-column gap-2">
                <p className="title">Mijozlar</p>
                <p className="count">{counts?.customer}</p>
              </div>
            </div>
            <div className="box d-flex gap-3 align-items-center">
              <img src={Ustoz} />
              <div className="right d-flex flex-column gap-2">
                <p className="title">Ustozlar</p>
                <p className="count">{counts?.teachers}</p>
              </div>
            </div>
            <div className="box d-flex gap-3 align-items-center">
              <img src={Jihoz} />
              <div className="right d-flex flex-column gap-2">
                <p className="title">Jihozlar</p>
                <p className="count">{counts?.equipments}</p>
              </div>
            </div>
          </div>
          <div className="teachers_box p-3">
            <h3 className="heading">Ustozlar</h3>
            <div className="boxes_wrp gap-3 d-flex flex-column mt-3">
            {!teachers?.length ? (
          <h2 className="not_found">Ustozlar mavjud emas!</h2>
        ) : (
          ""
        )}

{teachers.length ? 
teachers?.map((el, idx)=>(
  <TeacherInfoBox key={idx} teacher={el}/>
))
 : ""}

           
              <div className="bottom p-2 d-flex align-items-center justify-content-between">
                <p className="pag_txt">1-6 dan {counts?.teachers}ta</p>
                <div className="buttons">
                {Array.from({ length: teacherTotalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => setTeacherCurrentPage(number)}
                className={`${number === teacherCurrentPage ? "active" : ""}`}
              >
                {number}
              </button>
            )
          )}
                </div>
              </div>
            </div>
          </div>
          <div className="customers_box p-3">
            <h3 className="heading">Mijozlar</h3>
            <div className="all_customers mt-3">
              <ul className="lists list-unstyled d-flex  align-items-center ">
                <li>Mijoz</li>
                <li>Ustoz</li>
                <li>Xizmat</li>
                <li>kuni</li>
              </ul>
              <div className="cus_boxes d-flex flex-column  gap-3  mt-3">

              {!customers?.length ? (
          <h2 className="not_found">Ustozlar mavjud emas!</h2>
        ) : (
          ""
        )}

{customers.length ? 
customers?.map((el, idx)=>(
  <CustomersInfoBox key={idx} customer={el}/>
))
 : ""}

                <div className="bottom p-2 d-flex align-items-center justify-content-between">
                  <p className="pag_txt">1-6 dan {counts?.customer}ta</p>
                  <div className="buttons">
                  {Array.from({ length: customerTotalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => setCustomerCurrentPage(number)}
                className={`${number === customerCurrentPage ? "active" : ""}`}
              >
                {number}
              </button>
            )
          )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="chat_panel p-2">
        <RightHeader/>
        <div className="messages">
          <h3 className="heading">Xabarlar</h3>
          <div className="msg_boxes_wrp d-flex flex-column gap-3">
          {chats.length ? chats.map((el,  idx)=>(
            <MessageBox data={el} key={idx} />
          )) : <h2 className="not_found">Chatlar topilmadi</h2>}
            
          </div>
          <button className="all_btn">Barchasi</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
