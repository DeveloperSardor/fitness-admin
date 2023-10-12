import React from 'react'
import './style.scss'
import ProfilePicture from '../../assets/images/profilePicture.png';
import { Link, useNavigate } from 'react-router-dom'
import {Area, AreaChart, Bar, BarChart, LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, Scatter, ScatterChart, YAxis} from 'recharts'
import RightHeader from '../../components/right-header';

const Statictics = () => {

const navigate = useNavigate();

document.title = 'Statistika'

const datas = [{
    month : "January",
    savings : 4000,
    checkings : 500
}, {
    month : "February",
    savings : 6000,
    checkings : 8000
}, {
    month : "March",
    savings : 2000,
    checkings : 200
}, {
    month : "April",
    savings : 3000,
    checkings : 1000
}, {
    month : "May",
    savings : 6000,
    checkings : 1500
}, {
    month : "June",
    savings : 8000,
    checkings : 1200
}]

  return (
    <div className='statictics page'>

    <div className='header_ flex items-center justify-between'>
    <h3 className='heading_top'>Statistika</h3>
   <RightHeader/>
    </div>
     
      <LineChart width={1000} className='mt-5' height={300} data={datas}>
        <CartesianGrid></CartesianGrid>
        <XAxis dataKey={"month"}></XAxis>
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Legend></Legend>
        <Line type={'monotone'} dataKey={'checkings'} stroke='green'></Line>
        <Line type={'monotone'} dataKey={'savings'} stroke=''></Line>
      </LineChart>
    </div>
  )
}

export default Statictics
