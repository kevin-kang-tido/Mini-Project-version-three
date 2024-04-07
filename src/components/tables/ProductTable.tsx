"use client";
import LoadingComponent from "@/app/loading";
import { Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import DataTable, { TableColumn } from "react-data-table-component";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Image from "next/image";
import { BASE_API_URL } from "../constant/baseUri";
import { ProductType } from '@/type/productType';
import SearchBar from "./SearchBar";

import { Card } from "flowbite-react";
import { EditProductForm } from "../forms/EditProductForm.1";
// import EditProductForm from "../forms/EditProductForm.1";


const customStyles = {
  rows: {
    style: {
      minWidth: "1000px",
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};


const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState({} as ProductType);

  const handleDetail = (product: ProductType) => {
    setSelectedProduct(product);
    onOpen();
  };
  const handleEditProduct = (product: ProductType) => {
    setSelectedProduct(product);
    onOpenEdit();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDeleteProduct = async (productId: number) => {
    try {
      await fetch(`${BASE_API_URL}products/${productId}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id !== productId));
      setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const columns: TableColumn<ProductType>[] = [
    {
      name:"ID",
      selector: row=> row.id
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable:true,
    },
    {
      name: 'Name',
      selector: row => row?.name,
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
        <Image src={row.image} width={90} height={80} alt="products"/>
      ), 
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div className="rounded-[50%] bg-gray-50 w-max p-2">
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <IoEllipsisHorizontal />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="detail"
                  onPress={() => handleDetail(row)}
                >
                  View Detail
                </DropdownItem>
                <DropdownItem 
                  key="edit" 
                  onPress={() => handleEditProduct(row)}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={() => handleDeleteProduct(row.id)}
                  >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${BASE_API_URL}products/`);
      const data = await response.json();
      setProducts(data.results);
      setFilteredProducts(data.results);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
      return;
    }
    const result = products.filter((item:ProductType) => {
      return item.name?.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredProducts(result);
  }, [products, search]);

  const paginationComponentOptions = {
    rowsPerPageText: "Rows in a page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All pages",
  };

  return (
    <div className="w-full">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Card
                  className="max-w-sm border-none w-full"
                >
                  <Image width={500} height={100} className="h-[300px] w-full object-cover" src={selectedProduct.image}  alt="product_detail" />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {selectedProduct.name}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-4">
                    {selectedProduct.desc}
                  </p>
                  <h5 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    ${selectedProduct.price}
                  </h5>
                </Card>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
              <ModalBody>
              {selectedProduct && (
                  <EditProductForm
                    title={selectedProduct.name}
                    description={selectedProduct.desc}
                    image={selectedProduct.image}
                    price={selectedProduct.price}
                    qty={selectedProduct.quantity}
                  />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <DataTable
        progressPending={isLoading}
        columns={columns}
        fixedHeader={true}
        fixedHeaderScrollHeight="600px"
        selectableRows
        pagination
        paginationComponentOptions={paginationComponentOptions}
        onSelectedRowsChange={() => console.log("row selected")}
        progressComponent={<LoadingComponent/>}
        customStyles={customStyles}
        data={filteredProducts}
        subHeader
        subHeaderComponent={<SearchBar value={search} onChange={handleSearchChange} />}
      />
    </div>
  );
};
export default ProductTable;
