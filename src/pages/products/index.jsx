import React from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicture from "../../assets/images/profilePicture.png";
import ProductCard from "../../components/product-card";
import RightHeader from "../../components/right-header";
import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "../../components/skeleton";
import toast from "react-hot-toast";


const Products = () => {


  const navigate = useNavigate();

  document.title = "Maxsulotlar";

  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const limit = 6;
  const [count, setCount] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [productLoad, setProductLoad] = useState();


  async function GetProducts() {
    
    try {
      setProductLoad(true);
      const { data } = await axios.get(
        `${BACKEND_URL}/products/products?page=${currentPage}`,
        { headers: { token: userDatas?.token } }
      );
      if (data.success) {
        setProducts(data.data);
        setCount(data.count);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProductLoad(false);
    }
  }

  async function searchHandler(value) {
    if (!searchInput.length) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/products/products?search=${value}`,
        { headers: { token: userDatas?.token } }
      );
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    GetProducts();
  }, [currentPage]);

  return (
    <div className="products-page page">
      <div className="header_ flex items-center justify-between">
        <h3 className="heading_top">Maxsulotlar</h3>
        <RightHeader />
      </div>
      <div className="top  d-flex justify-content-between align-items-center">
        <input
          placeholder="🔍 Izlash"
          onInput={(e) => searchHandler(e.target.value)}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Link to={"/add-product"} className="text-decoration-none btn add_teacher">
          +
        </Link>
      </div>
      <div className="products_wrp flex items-center justify-between flex-wrap mt-4">
        {!products?.length ? (
          <h2 className="not_found">Maxsulotlar mavjud emas!</h2>
        ) : (
          ""
        )}
        {productLoad ? <Skeleton /> : ""}
        {products.length
          ? products?.map((el, idx) => (
              <ProductCard reload={GetProducts} key={idx} product={el} />
            ))
          : ""}
      </div>
      <div
        className={` ${
          !products.length && "d-none"
        } bottom p-2 d-flex align-items-center justify-content-between`}
      >
        <p className="pag_txt">
          1-{limit} dan {count}ta
        </p>
        <div className="buttons">
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
        {/* <div className='bottom p-2 d-flex align-items-center justify-content-between'>
            <p className='pag_txt'>1-9 dan 36ta</p>
            <div className='buttons'>
              <button className='active'>1</button>
              <button>2</button>
              <button>3</button>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default Products;
