import React from "react";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";

import { MDBDataTable } from "mdbreact";

function Order() {
  const { orders, setOrders } = useContext(AppContext);

  const [statusFilter, setStatusFilter] = useState("");
  const filteredOrders = orders.filter(
    (order) => statusFilter === "" || order.status === statusFilter
  );

  const orderstatus = (orderstatus) => {
    switch (orderstatus) {
      case "delivering":
        return <FaIcons.FaTruck className="custom-icon" />;
      case "delivered":
        return <TiIcons.TiTick className="custom-icon" />;
      case "cancel":
        return <GiIcons.GiCancel className="custom-icon" />;
      case "washing":
        return <GiIcons.GiWashingMachine className="custom-icon" />;
      default:
        return null;
    }
  };
  const transformedOrders = filteredOrders.map((order) => ({
    ...order,
    rawStatus: order.status,
    status: orderstatus(order.status),
    details: <Link to={`/OrderDetails/${order.id}`}>View Details</Link>,
  }));

  const columns = [
    {
      label: "ID",
      field: "id",
    },
    {
      label: "Date",
      field: "date",
      sort: "asc",
    },
    {
      label: "Username",
      field: "username",
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 100,
    },
    {
      label: "DETAILS",
      field: "details",
    },
    {
      label: "Raw Status",
      field: "rawStatus",
    },
  ];

  const data = {
    columns: columns,
    rows: transformedOrders,
  };
  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="admintitle">
            <h2>Order management</h2>
          </div>
        </div>
        <div className="col text-right">
          <select id="myDropdown" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="delivering">Delivering</option>
            <option value="delivered">Delivered</option>
            <option value="cancel">Cancel</option>
            <option value="washing">Washing</option>
          </select>
        </div>
      </div>

      <MDBDataTable
        striped
        bordered
        small
        data={data}
        responsiveSm
        noBottomColumns={true}
        className="custom-table hidden-column"
      />
    </div>
  );
}

export default Order;
