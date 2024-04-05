
import { Metadata } from 'next';
import React, { Suspense } from 'react'
import LoadingComponent from '../loading';
import { ProductType } from '@/type/productType';
import Link from 'next/link';
// import CardComponent from '@/components/card/CardComponent';
import { title } from 'process';
import Home from './../page';
import HeroSection from '@/components/layout/hero-section/HeroSection';
import CardComponents from '@/components/card/CardComponent';

async function fetchData() {
  const data = await fetch("https://store.istad.co/api/products/")
  const res = await data.json()
  return res.results;
}

export const metadata: Metadata = {
  title: "Product",
  description: "This is Product page shop",
  keywords: ['shop', 'sell', 'buy','economy']
};

export default async function ProductComponent(){
  const products = await fetchData();
  return (
    <>
      <h1 className='text-center text-xl sm:text-2xl md:text-4xl font-semibold m-9'>Our Products</h1>
      <div className='mt-10 flex justify-center flex-wrap gap-5'>
        <Suspense fallback={<LoadingComponent/>}>
          {
            products.map((product:ProductType)=>{
              return(
                <Link href={`/product/${product.id}`} key={product.id}>
                  <div className="gird grid-cols-2  md:grid-cols-4 sm:grid-cols-4">
                  <CardComponents
                    title={product.name}
                    price={product.price}
                    image={product.image}
                    description={product.desc}
                  />
                  </div>

                </Link>
              )
            })
          }
        </Suspense>
      </div>
    </>
  )
}
