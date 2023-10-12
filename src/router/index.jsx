import React from "react";
import { Routes, Route} from 'react-router-dom'
import Login from "../pages/login";
import Layout from "../pages/layout";
import Home from "../pages/home";
import Verification from "../pages/verification";
import Teachers from "../pages/teachers";
import Customer from "../pages/customers";
import Equipments from "../pages/equipments";
import Products from "../pages/products";
import QuestionAnswer from "../pages/question-answer";
import Statictics from "../pages/statictics";
import AddTeacher from "../pages/add-teacher";
import AddEquipment from "../pages/add-equipment";
import AddCustomer from "../pages/add-customer";
import AddProduct from "../pages/add-product";
import TeacherById from "../pages/teacherById";
import CustomerById from "../pages/customerById";
import ProductById from "../pages/productById";
import EquipmentById from "../pages/equipmentById";
import Orders from "../pages/orders";


const Router = ()=>{
    return(
            <Routes>
            <Route path="/" element={<Layout/>}>
                <Route  index element={<Home/>}/>
                <Route  path="/teachers" element={<Teachers/>}/>
                <Route  path="/customers" element={<Customer/>}/>
                <Route  path="/equipments" element={<Equipments/>}/>
                <Route  path="/products" element={<Products/>}/>
                <Route  path="/question-answer" element={<QuestionAnswer/>}/>
                <Route  path="/orders" element={<Orders/>}/>
                <Route  path="/statictics" element={<Statictics/>}/>
                <Route  path="/add-teacher" element={<AddTeacher/>}/>
                <Route  path="/add-customer" element={<AddCustomer/>}/>
                <Route  path="/add-equipment" element={<AddEquipment/>}/>
                <Route  path="/add-product" element={<AddProduct/>}/>
                <Route  path="/teachers/:id" element={<TeacherById/>}/>
                <Route  path="/customers/:id" element={<CustomerById/>}/>
                <Route  path="/my-profile" element={<CustomerById/>}/>
                <Route  path="/products/:id" element={<ProductById/>}/>
                <Route  path="/equipments/:id" element={<EquipmentById/>}/>
            </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/verification" element={<Verification/>}/>
            </Routes>
    )
}

export default Router;