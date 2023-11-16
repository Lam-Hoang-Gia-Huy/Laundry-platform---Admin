import React from "react";
import StatBox from "./Component/StatBox";
import user from "./image/user.png";
import order from "./image/checkout.png";
import store from "./image/store.png";
import done from "./image/checked.png";
import washing from "./image/laundry-machine.png";
import cancel from "./image/multiply.png";
import delivering from "./image/shipped.png";
import CategoryPieChart from "./Component/CategoryPieChart";
import LineChart from "./Component/LineChart";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";

function Home() {
  const { stores } = useContext(AppContext);
  const { orders } = useContext(AppContext);
  const { users } = useContext(AppContext);
  // const filteredStores = stores.filter(
  //   (store) => store.status === "on" || store.status === "off"
  // );
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <StatBox
          img={user}
          text="Người dùng"
          value={users.length}
          position={"top"}
        ></StatBox>
        <StatBox
          img={store}
          text="Cửa hàng"
          value={stores.length}
          position={"top"}
        ></StatBox>
        <StatBox
          img={order}
          text="Đơn hàng"
          value={orders.length}
          position={"top"}
        ></StatBox>
      </div>
      <div className="row justify-content-center mt-5">
        <StatBox
          img={done}
          text="Đã hoàn thành"
          value={orders.filter((item) => item.status === 7).length}
        ></StatBox>
        <StatBox
          img={cancel}
          text="Đã huỷ"
          value={orders.filter((item) => item.status === 0).length}
        ></StatBox>
        <div className="row justify-content-center">
          <StatBox
            img={delivering}
            text="Đang giao"
            value={orders.filter((item) => item.status === 6).length}
          ></StatBox>
          <StatBox
            img={washing}
            text="Đang giặt"
            value={orders.filter((item) => item.status === 4).length}
          ></StatBox>
        </div>

        <div className="row d-flex justify-content-end">
          <div className="col-sm-12 col-md-4 mt-5">
            <CategoryPieChart />
          </div>
          <div className="col-sm-12 col-md-8 mt-5 ">
            <div className="card shadow-1">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
