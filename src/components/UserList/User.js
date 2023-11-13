import React from "react";
// import "../Web.css";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import * as ImIconS from "react-icons/im";

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
      const newStatus = !prevStates[id];
      axios
        .patch(`http://localhost:3000/users/${id}`, {
          status: newStatus,
        })
        .then((response) => {
          console.log("Success:", response.data);
          // Update the users state with the new status
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
      .delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const transformedUsers = users.map((user) => ({
    ...user,
    avatar: (
      <img
        src="https://bootdey.com/img/Content/avatar/avatar6.png"
        alt="User Avatar"
      />
    ),
    statusIcon: (
      <Switch
        checked={switchStates[user.id] || false}
        onChange={() => handleToggle(user.id)}
        color="warning"
      />
    ),
    details: <Link to={`/userDetails/${user.id}`}>View Details</Link>,
    action: (
      <ImIconS.ImBin
        className="action-icon"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this user?")) {
            handleDelete(user.id);
          }
        }}
      />
    ),
  }));
  const columns = [
    {
      label: "AVATAR",
      field: "avatar",
      sort: "asc",
    },
    {
      label: "USERNAME",
      field: "username",
      sort: "asc",
    },
    {
      label: "PHONE",
      field: "phone",
      sort: "asc",
    },
    {
      label: "ADDRESS",
      field: "address",
      sort: "asc",
    },
    {
      label: "STATUS",
      field: "statusIcon",
      sort: "asc",
    },
    {
      label: "DETAILS",
      field: "details",
      sort: "asc",
    },
    {
      label: "ACTION",
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
        <h2>User Management</h2>
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
