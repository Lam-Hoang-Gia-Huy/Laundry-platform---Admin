import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
function StoreBio() {
  const { stores } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);

  let thisStore;

  thisStore = stores.find((prod) => prod.id === id);

  return (
    <div className="container profile-container">
      <div className="row">
        <div className="col-md-6 profile-info">
          <div className="card bio-graph-card shadow-1">
            <div className="card-body bio-graph-body">
              <h5 className="card-title bio-graph-title">Thông tin cửa hàng</h5>
              <p>
                <strong>Tên cửa hàng:</strong> {thisStore.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {thisStore.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {thisStore.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreBio;
