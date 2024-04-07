import DetailProductCard from "@/components/card/CardDetailComponent";
import { describe } from "node:test";
import { title } from "process";
import React from "react";

export type ParamProps = {
  params: {
    id: number;
  };
};

async function getDetail(id: number) {
  const productDetail = await fetch(`https://store.istad.co/api/products/${id}`);
  return productDetail.json();
}

export async function generateMetadata({params}: any) {
  const id = params.id;
  const product = await getDetail(id);
  return {
    title: product?.title,
    describe: product.description,
    openGraph: {
      images: product.image,
    },
  }
}

async function page({ params }: ParamProps) {
  const id = params.id;
  const productDetail = await getDetail(id);
  return (
    <>
      <DetailProductCard
        title={productDetail.name}
        image={productDetail.image}
        description={productDetail.desc}
        price={productDetail.price}
      
      />
    </>
  );
}

export default page;