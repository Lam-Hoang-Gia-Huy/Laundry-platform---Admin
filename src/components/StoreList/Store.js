import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import axios from "axios";
import { useEffect } from "react";
import * as ImIconS from "react-icons/im";

function Store() {
  const { stores, setStores } = useContext(AppContext);

  // const filteredStores = stores.filter(
  //   (store) => store.status === "on" || store.status === "off"
  // );

  const columns = [
    {
      label: "ID",
      field: "id",
      sort: "asc",
    },
    {
      label: "STORENAME",
      field: "name",
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
      label: "Details",
      field: "details",
      sort: "asc",
    },
    {
      label: "Action",
      field: "action",
      sort: "asc",
    },
  ];
  // First, create a state variable for the switch states.
  const [switchStates, setSwitchStates] = useState(
    stores?.reduce((acc, store) => ({ ...acc, [store.id]: store.status }), {})
  );

  useEffect(() => {
    setSwitchStates(
      stores?.reduce((acc, store) => ({ ...acc, [store.id]: store.status }), {})
    );
  }, [stores]);

  const handleToggle = (id) => {
    setSwitchStates((prevStates) => {
      const newStatus = prevStates[id] === "on" ? "off" : "on";
      axios
        .patch(`http://localhost:3000/stores/${id}`, {
          status: newStatus,
        })
        .then((response) => {
          console.log("Success:", response.data);
          setStores((prevStores) =>
            prevStores.map((store) =>
              store.id === id ? { ...store, status: newStatus } : store
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
      .delete(`http://localhost:3000/stores/${id}`)
      .then(() => {
        setStores((prevStores) =>
          prevStores.filter((store) => store.id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const transformedstores = stores.map((store) => ({
    ...store,
    statusIcon: (
      <Switch
        className="custom-status-icon"
        checked={switchStates[store.id] === 1}
        onChange={() => handleToggle(store.id)}
      />
    ),
    details: (
      <NavLink to={`/admin/store/list/${store.id}/bio`}>View Details</NavLink>
    ),
    action: (
      <ImIconS.ImBin
        className="action-icon"
        style={{ width: "25%" }}
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this store?")) {
            handleDelete(store.id);
          }
        }}
      />
    ),
  }));

  const data = {
    columns: columns,
    rows: transformedstores,
  };

  return (
    <div className="container">
      <NavLink to="" className="admintitle multipage">
        <h2>Cửa hàng</h2>
      </NavLink>
      <NavLink to="/admin/store/storemanager" className="admintitle multipage">
        <h2>Duyệt cửa hàng</h2>
      </NavLink>
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
