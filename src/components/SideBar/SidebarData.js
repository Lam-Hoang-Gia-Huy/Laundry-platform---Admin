import React, { useState, useSelector } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
export const SidebarData = [
  {
    title: "Trang chủ",
    path: "/admin/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Quản lý người dùng",
    path: "/admin/user",
    icon: <BiIcons.BiUser />,
    cName: "nav-text",
  },
  {
    title: "Quản lý cửa hàng",
    path: "/admin/store/list",
    icon: <AiIcons.AiFillShop />,
    cName: "nav-text",
  },
  {
    title: "Quản lý đơn hàng",
    path: "/admin/order",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Quản lý thẻ",
    path: "/admin/tagManagement",
    icon: <AiFillTag />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/admin/logout",
    icon: <BiIcons.BiLogOut />,
    cName: "logout",
  },
];
