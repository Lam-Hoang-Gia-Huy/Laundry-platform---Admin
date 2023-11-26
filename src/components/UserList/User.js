import React from "react";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import * as ImIconS from "react-icons/im";
import { config } from "../axios/auth-header";
import { message } from "antd";
import { Popconfirm } from "antd";

function User() {
  const { users, setUsers } = useContext(AppContext);
  const { setStores } = useContext(AppContext);
  const [switchStates, setSwitchStates] = useState(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
  );

  useEffect(() => {
    setSwitchStates(
      users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
    );
  }, [users]);

  const handleToggle = (id) => {
    setSwitchStates((prevStates) => {
      const newStatus = prevStates[id] === 1 ? 2 : 1;
      axios
        .put(
          `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/update/${id}?status=${newStatus}`,
          {
            status: newStatus,
          },
          config
        )
        .then((response) => {
          console.log("Success:", response.data);
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id ? { ...user, status: newStatus } : user
            )
          );
          setStores((prevStores) =>
            prevStores.map((store) =>
              store.user.id === id
                ? { ...store, user: { ...store.user, status: newStatus } }
                : store
            )
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          message.error("Chuyển trạng thái thất bại");
        });

      return { ...prevStates, [id]: newStatus };
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/delete/${id}`,
        config
      )
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        message.success("Xoá tài khoản thành công!");
      })
      .catch((error) => {
        console.error(error);
        message.error("Xoá thất bại");
      });
  };

  const confirmDelete = (id) => {
    handleDelete(id);
  };

  const transformedUsers = users.map((user) => ({
    ...user,
    statusIcon: (
      <Switch
        checked={switchStates[user.id] === 1}
        onChange={() => handleToggle(user.id)}
        color="warning"
        className="custom-icon"
      />
    ),
    details: <Link to={`${user.id}`}>Chi tiết</Link>,
    action: (
      <Popconfirm
        title="Bạn có muốn xoá tài khoản này?"
        onConfirm={() => confirmDelete(user.id)}
        okText="có"
        cancelText="không"
      >
        <ImIconS.ImBin className="action-icon" style={{ width: "25%" }} />
      </Popconfirm>
    ),
  }));
  const columns = [
    {
      label: "AVATAR",
      field: "image",
      sort: "asc",
    },
    {
      label: "Tên người dùng",
      field: "fullName",
      sort: "asc",
    },
    {
      label: "Số điện thoại",
      field: "phone",
      sort: "asc",
    },
    {
      label: "Địa chỉ",
      field: "address",
      sort: "asc",
    },
    {
      label: "Trạng thái",
      field: "statusIcon",
      sort: "asc",
    },
    {
      label: "Thông tin",
      field: "details",
      sort: "asc",
    },
    {
      label: "Thao tác",
      field: "action",
      sort: "asc",
    },
  ];

  const data = {
    columns: columns,
    rows: transformedUsers,
  };

  return (
    <div className="container">
      <div className="admintitle">
        <h2>Người dùng</h2>
      </div>
      <MDBDataTable
        striped
        bordered
        small
        data={data}
        responsiveSm
        noBottomColumns={true}
        className="custom-table"
      />
    </div>
  );
}

export default User;
