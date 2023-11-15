import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";

import { MDBDataTable } from "mdbreact";

function Order() {
  const { orders, setOrders } = useContext(AppContext);
  const statusMap = {
    1: "Chờ xác nhận",
    2: "Chờ lấy hàng",
    3: "Vận chuyển đến cửa hàng",
    4: "Xử lý bởi cửa hàng",
    5: "Đơn sẵn sàng vận chuyển",
    6: "Đơn đang được giao",
    7: "Đơn đã hoàn thành",
  };

  const [statusFilter, setStatusFilter] = useState("");
  const filteredOrders = orders.filter(
    (order) => statusFilter === "" || order.status === statusFilter
  );

  const transformedOrders = filteredOrders.map((order) => ({
    ...order,
    username: order.user.fullName,
    statusString: statusMap[order.status],
    storename: order.store.name,
    details: <Link to={`/OrderDetails/${order.id}`}>View Details</Link>,
  }));

  const columns = [
    {
      label: "ID",
      field: "id",
    },
    {
      label: "Date",
      field: "orderDate",
      sort: "asc",
    },
    {
      label: "Username",
      field: "username",
    },
    {
      label: "STORENAME",
      field: "storename",
      sort: "asc",
    },
    {
      label: "STATUS",
      field: "statusString",
      sort: "asc",
    },
    {
      label: "DETAILS",
      field: "details",
    },
  ];

  const data = {
    columns: columns,
    rows: transformedOrders,
  };
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value === "" ? "" : Number(value));
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
            <option value="0">Cancel</option>
            <option value="1">Chờ xác nhận</option>
            <option value="2">Chờ lấy hàng</option>
            <option value="3">Vận chuyển đến cửa hàng</option>
            <option value="4">Xử lý bởi cửa hàng</option>
            <option value="5">Đơn sẵn sàng vận chuyển</option>
            <option value="6">Đơn đang được giao</option>
            <option value="7">Đơn đã hoàn thành</option>
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
