import AboutUsComponent from '@/components/pages/AboutComponent'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "About us",
  description: "This is about us shop",
  keywords: ['shop', 'ecommerce', 'sell']
};

export default function page() {
  return (
    <div>
      <AboutUsComponent/>
    </div>
  )
}
