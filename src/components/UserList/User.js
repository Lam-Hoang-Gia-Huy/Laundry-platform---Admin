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

function User() {
  const { users, setUsers } = useContext(AppContext);
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
        })
        .catch((error) => {
          console.error("Error:", error);
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
      })
      .catch((error) => {
        console.error(error);
      });
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
      <ImIconS.ImBin
        className="action-icon"
        onClick={() => {
          if (window.confirm("bạn có muốn xoá người dùng này?")) {
            handleDelete(user.id);
          }
        }}
      />
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
