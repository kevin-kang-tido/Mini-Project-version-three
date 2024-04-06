"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import { BASE_API_URL } from "../constant/baseUri";
import { title } from 'process';
import { ProductType } from "@/type/productType";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB 
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];



const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
});


const fieldStyle = "border border-gray-300 rounded-md";

function EditProductForm({title,price,image,description,qty}:ProductType){
  const myHeaders = new Headers();

  const handleUpdateProduct = async (values: any, imageData: any) => {
    try {
      // Send the image data to the server
      const imageUrl = await handleSubmitToServer(imageData);

      // Send a PUT request to update the product details
      const response = await axios.put(`${BASE_API_URL}products/${selectedProduct.id}/`, {
        ...values,
        image: imageUrl,
      }, {
        headers: myHeaders,
      });

      console.log("Updated product:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitToServer = async (values: any) => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}file/product/`,
        values.image
      );
      return response.data.image;
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleCreateProduct = async (values: any, imageData: any) => {
    try {
      const imageUrl = await handleSubmitToServer(imageData);
      console.log("data: ", values);
      const postData = await fetch(`${BASE_API_URL}products/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ...values,
          image: imageUrl,
        }),
      });
      console.log("post data: ", postData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full pt-9">
      <Formik
          onSubmit={(values: any, { setSubmitting, resetForm }) => {
            const formData = new FormData();
            formData.append("image", values.image);
            handleUpdateProduct(values, { image: formData });
            setSubmitting(false);
            resetForm();
          }}
          validationSchema={validationSchema}
          initialValues={{
            name: title,
            desc: description,
            image: undefined,
            price: price,
            quantity: qty,
          }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder={title}
                className={fieldStyle}
                name="name"
                type="text"
              />
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder={description}
                className={fieldStyle}
                name="desc"
                type="text"
              />
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder={price}
                className={fieldStyle}
                name={price}
                type="number"
              />

            </div>
            {/* quantity */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity">Quantity: </label>
              <Field
                placeholder={qty}
                className={fieldStyle}
                name="quantity"
                type="number"
              />
              <div>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                />
              
                   <img src={image} className="w-[400px] h-[300px]" alt="image_product" />
                <ErrorMessage name="image">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#ED6533] text-white rounded-md"
                disabled={isSubmitting}
                onClick={() => showAlert('Product Update successfully!')}
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProductForm;


// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );

  const name = field.name;

  const onChange: any = (event: any) => {
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
    // Read the uploaded image file
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <input
        type="file"
        onChange={onChange}
        {...props}
        className="border border-gray-300 rounded-md"
      />
      {previewImage && (
        <Image
          className="rounded-md object-cover"
          src={previewImage}
          alt="preview Image"
          width={100}
          height={100}
        />
      )}
    </div>
  );
}