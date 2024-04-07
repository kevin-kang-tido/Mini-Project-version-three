"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import axios from "axios";
import { BASE_API_URL } from "../constant/baseUri";
import { ProductType } from "@/type/productType";
import { validationSchema, fieldStyle, CustomInput } from "./EditProductForm";

export function EditProductForm({ title, price, image, description, qty, selectedProduct }: ProductType & { selectedProduct: { id: string } }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NjcwNTg1LCJpYXQiOjE3MTI1MTA1ODUsImp0aSI6ImMwODU4MTFmZjNiNDRlNWU5YWUyNmQzOGI0OTNlNGYyIiwidXNlcl9pZCI6MTJ9.1FUM8l1yAQ65-TtNYD-UvUGNBrByltpGtPf1mcNhQpQ");
  myHeaders.append("Cookie", "csrftoken=ntSoeTzPXCbcUJyd4RYyQIIBQLulVNUHhpym1naPEocO7Uh46cH9pCBQ5J8u2jJT; sessionid=lt5uxhco8ur6sgu1v51bcrje4s8javez");
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

  // const handleCreateProduct = async (values: any, imageData: any) => {
  //   try {
  //     const imageUrl = await handleSubmitToServer(imageData);
  //     console.log("data: ", values);
  //     const postData = await fetch(`${BASE_API_URL}products/`, {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: JSON.stringify({
  //         ...values,
  //         image: imageUrl,
  //       }),
  //     });
  //     console.log("post data: ", postData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
                type="text" />
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder={description}
                className={fieldStyle}
                name="desc"
                type="text" />
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder={price}
                className={fieldStyle}
                name={price}
                type="number" />

            </div>
            {/* quantity */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity">Quantity: </label>
              <Field
                placeholder={qty}
                className={fieldStyle}
                name="quantity"
                type="number" />
              <div>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                />

                {/* <img src={image} className="w-[400px] h-[300px]" alt="image_product" /> */}
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
              >
                Update
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
