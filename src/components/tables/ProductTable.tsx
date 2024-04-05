"use client"
import { ProductType } from '@/type/productType';
import React, { useEffect, useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import LoadingComponent from '../loading/LoadingComponent';
// import { Button, Dropdown, TextInput} from 'flowbite-react';
import SearchBar from './SearchBar';
// import { Dropdown } from "flowbite-react";
import Link from 'next/link';

  const columns: TableColumn<ProductType>[] = [
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable:true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable:true,
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable:true,
    },
    {
      name:"Image",
      selector: (row):any => 
      (
        <img src={row.image} width={90} height={80} alt="products"/>
      ), 
    },
  //   {
  //     //  name:"Action",
  //     //  selector:(row):any=>{
  //     //   return (

  //     //   );
  //     //  }
  // },
  ]

const ProductTable = () => {
  const [isLoading,setIsLoading] = useState(true);
  const [getProduct,setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [filter,setFilter] = useState(getProduct);




  async function fetchProduct() {
    const data = await fetch("https://store.istad.co/api/products/");
    const res = await data.json();
    return setProduct(res.results);
   
  }
  useEffect(() =>{
    fetchProduct();
    setIsLoading(false);
  },[])

  useEffect(()=>{
    if(!search) {

      setFilter(getProduct);
      return;
    }
    const result = getProduct.filter((item)=>{
      return item.name?.toLowerCase().includes(search.toLowerCase());
    })
    setFilter(result);

  },[search,getProduct]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const paginationComponentOptions = {
    rowsPerPageText: 'rows per page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  return (
    <div>
    <DataTable
      fixedHeaderScrollHeight="560px"
      progressPending={isLoading}
      columns={columns}
      data={filter}
      progressComponent={<LoadingComponent/>}
      selectableRows
      pagination 
      paginationComponentOptions={paginationComponentOptions}
      subHeader 
      subHeaderComponent={<SearchBar value={search} onChange={handleSearchChange} />}
    />
    </div>
  )
}

export default ProductTable;
