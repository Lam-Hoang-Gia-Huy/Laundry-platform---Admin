import React from "react";
import StatBox from "./Component/StatBox";
import user from "./image/user.png";
import order from "./image/checkout.png";
import store from "./image/store.png";
import activeUser from "./image/active-user.png";
import materialimage from "./image/fabric-pattern.png";
import activeStore from "./image/seller.png";
import clothimage from "./image/clothes-hanger.png";
import CategoryPieChart from "./Component/CategoryPieChart";
import LineChart from "./Component/LineChart";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
import TagManagement from "../TagList/TagManagement";
import ClothManagement from "../TagList/ClothManagement";
function Home() {
  const { stores } = useContext(AppContext);
  const { orders } = useContext(AppContext);
  const { users } = useContext(AppContext);
  const { material } = useContext(AppContext);
  const { cloth } = useContext(AppContext);
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
        {/* <StatBox
          img={order}
          text="Đơn hàng"
          value={orders.length}
          position={"top"}
        ></StatBox> */}
      </div>
      <div className="row justify-content-center mt-5">
        <StatBox
          img={activeUser}
          text="Người dùng hoạt động"
          value={users.filter((item) => item.status === 1).length}
        ></StatBox>
        <StatBox
          img={activeStore}
          text="Cửa hàng hoạt động"
          value={stores.filter((item) => item.user.status === 1).length}
        ></StatBox>
        <div className="row justify-content-center">
          <StatBox
            img={materialimage}
            text="Vật liệu"
            value={material.length}
          ></StatBox>
          <StatBox
            img={clothimage}
            text="Loại quần áo"
            value={cloth.length}
          ></StatBox>
        </div>

        <div className="row d-flex justify-content-end">
          <div className="col-sm-12 col-md-6 mt-5">
            <div className="card shadow-1" style={{ background: "#91b4ed" }}>
              <TagManagement />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 mt-5 ">
            <div className="card shadow-1" style={{ background: "#91b4ed" }}>
              <ClothManagement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
