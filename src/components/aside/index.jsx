import React from 'react'
import './style.scss'
import LogoImg from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import {  FaQuestion} from 'react-icons/fa'

const Aside = () => {
  return (
    <aside className=''>
      <Link to={'/'} className='logo_brand text-decoration-none'>
          <img src={LogoImg} alt='logo'/>
      </Link>
      <ul className='links ps-3'>
        <NavLink to={'/'} className={`d-flex ${({isActive, isPending})=> isActive ? "active" : ""}`}>
        <i className="fa-solid fa-house"></i>
        <p>Asosiy</p>
        </NavLink>
        <NavLink to={'/teachers'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <i className="fa-solid fa-chalkboard-user"></i>
        <p>Ustozlar</p>
        </NavLink>
        <NavLink to={'/customers'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <i className="fa-solid fa-user"></i>
        <p>Mijozlar</p>
        </NavLink>
        <NavLink to={'/equipments'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <i className="fa-regular fa-calendar"></i>
        <p>Jihozlar</p>
        </NavLink>
        <NavLink to={'/products'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <i className="fa-regular fa-calendar"></i>
        <p>Maxsulotlar</p>
        </NavLink>
        <NavLink to={'/orders'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <i className="fa-regular fa-calendar"></i>
        <p>Buyurtmalar</p>
        </NavLink>
        <NavLink to={'/question-answer'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <FaQuestion/>
               <p>Savol javob</p>
        </NavLink>
        <NavLink to={'/statictics'} className={`d-flex ${({isActive, isPending})=>isActive ? "active" : ""}`}>
        <i className="fa-solid fa-chart-line"></i>        <p>Statistika</p>
        </NavLink>
      </ul>
    </aside>
  )
}

export default Aside
