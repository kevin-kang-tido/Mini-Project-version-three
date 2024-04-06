
"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export default function DasboardSlideBar() {
  const pathName = usePathname();
  if(pathName === "/dasboard/create-product"){
    return null;
  }
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/dasboard/create-product" icon={HiChartPie}>
            Create Product
          </Sidebar.Item>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="E-commerce"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
            }}
          >
            <Sidebar.Item href="/dasboard/create-product">Create Product</Sidebar.Item>
            <Sidebar.Item href="/dasboard/edit-product">Edit Product</Sidebar.Item>
            <Sidebar.Item href="/dasboard/delete-product">Delete Proudct</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
