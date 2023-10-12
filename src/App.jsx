import React from "react";
import { Toaster } from "react-hot-toast";

import Router from "./router";
import EditModal from "./components/edit-modal";
import { useState } from "react";
import context from "./context";
import EditModalProduct from "./components/edit-product";

const App = () => {
  const userDatas = JSON.parse(localStorage.getItem("userDatas"));
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [defaultData, setDefaultData] = useState({ userDatas });
  const [isOpenEditProduct, setIsOpenEditProduct] = useState(false);
  const [defaultDataProduct, setDefaultDataProduct] = useState();
  return (
    <context.Provider
      value={{
        isOpenEditModal,
        setIsOpenEditModal,
        defaultData,
        setDefaultData,
        isOpenEditProduct,
        setIsOpenEditProduct,
        defaultDataProduct,
        setDefaultDataProduct
      }}
    >
      <Router />
      <Toaster />
      <EditModal user={defaultData} />
      <EditModalProduct product={defaultDataProduct} />
    </context.Provider>
  );
};

export default App;
