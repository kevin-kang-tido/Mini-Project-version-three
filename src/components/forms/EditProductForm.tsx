"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import { title } from 'process';
import { EditProductForm } from "./EditProductForm.1";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB 
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];



export const validationSchema = Yup.object().shape({
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


export const fieldStyle = "border border-gray-300 rounded-md";

;

export default EditProductForm;
// custom Input
export function CustomInput({ field, form, setFieldValue, ...props }: any) {
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