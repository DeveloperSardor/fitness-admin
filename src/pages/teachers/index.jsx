import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import TeacherCard from "../../components/teacher-card";
import ProfilePicture from "../../assets/images/profilePicture.png";
import RightHeader from "../../components/right-header";
import toast from "react-hot-toast";
import axios from "axios";
import Skeleton from "../../components/skeleton";


const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const limit = 6;
  const [count, setCount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [teacherLoad, setTeacherLoad] = useState(false);
  document.title = "Ustozlar";

  useEffect(() => {
    GetTeachers();
  }, [currentPage]);

  async function searchHandler(value){
    if(!searchInput.length){return}
    try {
      const {data} = await axios.get(`${BACKEND_URL}/users/teachers?search=${value}`, {headers : {token : userDatas?.token}});
      if(data.success){
        setTeachers(data.data)
      }else{
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
        `${BACKEND_URL}/users/teachers?page=${currentPage}`,
        { headers: { token: userDatas?.token } }
      );
      if (data.success) {
        setTeachers(data.data);
        setCount(data.count);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setTeacherLoad(false);
    }

  }

    
    return (
    <div className='teachers-page  page'>
    <div className='header_ flex items-center justify-between'>
    <h3 className='heading_top'>Ustozlar</h3>
   <RightHeader/>
    </div>
      <div className='top  d-flex justify-content-between align-items-center'>
      <input placeholder='🔍 Izlash' onInput={e=>searchHandler(e.target.value)} onChange={e=>setSearchInput(e.target.value)}/>
      <Link to={"/add-teacher"} className="text-decoration-none btn add_pr">
          +
        </Link>
      </div>
      <div className='teachers_wrapper mt-3 d-flex align-items-center justify-content-between flex-wrap'>
      {!teachers?.length ? (
          <h2 className="not_found">Ustozlar mavjud emas!</h2>
        ) : (
          ""
        )}
        {teacherLoad ? <Skeleton /> : ""}
        {teachers.length ?
          teachers?.map((el, idx) => <TeacherCard reload={GetTeachers}  key={idx} teacher={el} />) : ""}
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
};


  export default Teachers
  