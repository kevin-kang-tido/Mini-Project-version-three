
import React from "react";
import ProductComponent from "../product/page";
import ProductTable from './../../components/tables/ProductTable';

const page = () => {
  return (
    <>
    
    <div className="flex flex-col justify-center text-center w-full m-7">
    <h1 className="font-bold text-[25px]">Product Data</h1>
       <div className='mb-12'>
       <ProductTable/>
       </div>
    </div>
    </>
  );
};

export default page;
