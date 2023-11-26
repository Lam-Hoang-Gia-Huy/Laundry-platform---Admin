import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import { useEffect } from "react";
import * as ImIconS from "react-icons/im";
import { config } from "../axios/auth-header";
import { message } from "antd";
import { Popconfirm } from "antd";

function Store() {
  const { stores, setStores } = useContext(AppContext);

  const columns = [
    {
      label: "No.",
      field: "id",
      sort: "asc",
      sortable: true,
    },
    {
      label: "Tên cửa hàng",
      field: "name",
      sort: "asc",
      sortable: true,
    },
    {
      label: "Tên chủ cửa hàng",
      field: "username",
      sort: "asc",
      sortable: true,
    },
    {
      label: "Số điện thoại",
      field: "phone",
      sort: "asc",
      sortable: false,
    },
    {
      label: "Địa chỉ",
      field: "address",
      sort: "asc",
      sortable: false,
    },
    {
      label: "Trạng thái",
      field: "statusIcon",
      sort: "asc",
      sortable: false,
    },
    {
      label: "Thông tin",
      field: "details",
      sort: "asc",
      sortable: false,
    },
    // {
    //   label: "Thao tác",
    //   field: "action",
    //   sort: "asc",
    //   sortable: false,
    // },
  ];
  // First, create a state variable for the switch states.
  const [switchStates, setSwitchStates] = useState(
    stores?.reduce(
      (acc, store) => ({ ...acc, [store.id]: store.user.status }),
      {}
    )
  );

  useEffect(() => {
    setSwitchStates(
      stores?.reduce(
        (acc, store) => ({ ...acc, [store.id]: store.user.status }),
        {}
      )
    );
  }, [stores]);

  // const handleToggle = (id) => {
  //   setSwitchStates((prevStates) => {
  //     const newStatus = prevStates[id] === 1 ? 2 : 1;
  //     axios
  //       .put(
  //         `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/update/${id}?status=${newStatus}`,
  //         {
  //           status: newStatus,
  //         },
  //         config
  //       )
  //       .then((response) => {
  //         console.log("Success:", response.data);
  //         setStores((prevStores) =>
  //           prevStores.map((store) =>
  //             store.user.id === id
  //               ? { ...store, user: { ...store.user, status: newStatus } }
  //               : store
  //           )
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });

  //     return { ...prevStates, [id]: newStatus };
  //   });
  // };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/admin/user/delete/${id}`
      )
      .then(() => {
        setStores((prevStores) =>
          prevStores.filter((store) => store.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const confirmDelete = (id) => {
    message.success("Xoá đơn thành công");
    handleDelete(id);
  };

  const transformedstores = stores.map((store) => ({
    ...store,
    username: store.user.fullName,
    statusIcon: (
      <Switch
        className="custom-icon"
        checked={switchStates[store.id] === 1}
        // onChange={() => handleToggle(store.id)}
        disabled={true}
      />
    ),
    details: (
      <NavLink to={`/admin/store/list/${store.id}/bio`}>Chi tiết</NavLink>
    ),
    action: (
      <Popconfirm
        title="Bạn có muốn cửa hàng khoản?"
        onConfirm={() => confirmDelete(store.user.id)}
        okText="có"
        cancelText="không"
      >
        <button>
          <ImIconS.ImBin className="action-icon" style={{ width: "25%" }} />
        </button>
      </Popconfirm>
    ),
  }));

  const data = {
    columns: columns,
    rows: transformedstores,
  };

  return (
    <div className="container">
      <div className="admintitle">
        <h2>Cửa hàng</h2>
      </div>
      {/* <NavLink to="/admin/store/storemanager" className="admintitle multipage">
        <h2>Duyệt cửa hàng</h2>
      </NavLink> */}
      <MDBDataTable
        striped
        bordered
        small
        data={data}
        responsiveSm
        noBottomColumns={true}
        className="custom-table custom-store-table"
      />
    </div>
  );
}

export default Store;
