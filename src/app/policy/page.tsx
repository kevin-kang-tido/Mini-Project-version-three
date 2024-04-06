import React from 'react'
import PolicyComponent from '../../components/policy/PolicyComponent'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Policy",
  description: "This is about us shop",
  keywords: ['shop', 'ecommerce', 'sell']
};

export default function page() {
  return (
    <div>
      <>
        <PolicyComponent/>
      </>
    </div>
  )
}
