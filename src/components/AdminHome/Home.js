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
          text="User"
          value={users.length}
          position={"top"}
        ></StatBox>
        <StatBox
          img={store}
          text="Store"
          value={stores.length}
          position={"top"}
        ></StatBox>
        <StatBox
          img={order}
          text="Order"
          value={orders.length}
          position={"top"}
        ></StatBox>
      </div>
      <div className="row justify-content-center mt-5">
        <StatBox
          img={done}
          text="Finish"
          value={orders.filter((item) => item.status === "delivered").length}
        ></StatBox>
        <StatBox
          img={cancel}
          text="Cancel"
          value={orders.filter((item) => item.status === "cancel").length}
        ></StatBox>
        <div className="row justify-content-center">
          <StatBox
            img={delivering}
            text="Delivering"
            value={orders.filter((item) => item.status === "delivering").length}
          ></StatBox>
          <StatBox
            img={washing}
            text="Washing"
            value={orders.filter((item) => item.status === "washing").length}
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
