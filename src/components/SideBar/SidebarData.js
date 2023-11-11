import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "User Management",
    path: "/user",
    icon: <BiIcons.BiUser />,
    cName: "nav-text",
  },
  {
    title: "Store Management",
    path: "/store",
    icon: <AiIcons.AiFillShop />,
    cName: "nav-text",
  },
  {
    title: "Order Management",
    path: "/order",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <BiIcons.BiLogOut />,
    cName: "logout",
  },
];
