
import { ProductType } from "@/type/productType";
import { Button, Card } from "flowbite-react";
import Image from "next/image";

const CardComponents = ({ title, price, image, description}: any) => {
  return (
    <div className="gird grid-cols-2 sm:grid-cols-4  md:grid-cols-4">
      <Card
        className="max-w-sm h-[400px] bg-[#C3DDFD] shadow-md transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        imgAlt="product_image"
      > 
        <Image width={500} height={500} src={image} alt="img_product" className="w-96 h-56 overflow-hidden rounded-lg "/>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 champ-line-2 dark:text-white">
          {title}
        </h5>
        <h4 className="dark:text-gray-400 text-base line-clamp-2">
          {description}
        </h4>
        <div className="mb-5 mt-2.5 flex items-center">
          {/* Rating stars */}
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
          {/* Rating value */}
          <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            5.0
          </span>
        </div>

        {/* Price and Add to cart button */}
        <div className="flex items-center justify-between">
          <p className="font-extrabold text-2xl  text-[#ED6533] dark:text-gray-400 ">
            ${price}
          </p>
          <Button
            className="rounded-lg bg-[#ED6533] size-sm text-center text-sm font-medium text-white hover:bg-[#ED6533]">
            Add to cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CardComponents;



