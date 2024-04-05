import CardComponent from "@/components/card/CardComponent";
import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import ProductComponent from "./product/page";
import HeroSection from './../components/layout/hero-section/HeroSection';
import LoadingComponent from "./loading";

export default function Home() {
  return (
    <>
          {/* <h1 className="text-lg text-center mt-12 font-bold">Product</h1> */}
          <HeroSection/>
          <div className="gird grid-cols-3 sm:grid-cols-4 md:gird-cols-4">
             <ProductComponent/>
          </div>
    </>
  );
}
