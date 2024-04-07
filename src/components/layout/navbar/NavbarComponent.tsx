'use client'

import { Avatar, Dropdown, Navbar,Button } from "flowbite-react";
import { usePathname } from "next/navigation";
import { Link } from 'next/link';
import Image from "next/image";

function NavBarComponent() {
  const pathName = usePathname();
  if(pathName === "/login" || pathName === "/signup"){
    return null;
  }
  return (
    <div className='bg-[#F3F3F3]'>
    <Navbar fluid rounded className="mx-24 rounded-sm p-6 sticky bg-[#F3F3F3]">
      <Navbar.Brand href="#" >
        <Image width={100} height={100} src="https://i.pinimg.com/564x/76/8d/c8/768dc8e04b054a6d2bd2b2bdd074f8b9.jpg" className="mr-3 h-6 sm:h-9" alt="company Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">CAM SHOP</span>
        <Navbar.Toggle />
      </Navbar.Brand>
     
      <Navbar.Collapse>
        <Navbar.Link href="/" className="text-lg font-bold ">
          Home
        </Navbar.Link>
        <Navbar.Link href="/policy" className="text-lg  font-bold">Policy</Navbar.Link>
        <Navbar.Link href="/about-us" className="text-lg font-bold">About Us</Navbar.Link>
      </Navbar.Collapse>

      <Navbar.Collapse>
      <Navbar.Link href="/signup" className="text-lg font-bold">
        <Button className="bg-[#ED6533] hover:bg-[#ED6533] left-0 mx-2 bottom-2">
          Resgiter
        </Button> 
        </Navbar.Link>
        <Navbar.Link href="/dasboard" className="text-lg font-bold">
        <Button className="bg-[#ED6533] hover:bg-[#ED6533]  left-0 mx-2 bottom-2">
          Dasboard
        </Button> 
        </Navbar.Link>
      </Navbar.Collapse>

    </Navbar>
  </div>
  );
}

export default NavBarComponent;