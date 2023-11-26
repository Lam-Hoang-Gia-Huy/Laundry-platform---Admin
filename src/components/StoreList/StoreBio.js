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
    <div className="container profile-container mt-0">
      <div className="col-md-9 profile-info">
        <div className="card bio-graph-card shadow-1">
          <div className="card-body bio-graph-body">
            <h5 className="card-title bio-graph-title">Thông tin cửa hàng</h5>

            <div className="d-flex flex-row justify-content-between">
              <div>
                <p>
                  <strong>Tên cửa hàng:</strong> {thisStore?.name}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {thisStore?.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {thisStore?.address}
                </p>
                <p>
                  <strong>Tên chủ cửa hàng:</strong> {thisStore.user?.fullName}
                </p>
              </div>
              <div>
                <p>
                  <strong>Email: </strong>
                  {thisStore.user?.email}
                </p>
                <p>
                  <strong>Trạng thái: </strong>

                  {thisStore.user.status === 1
                    ? "Hoạt động"
                    : "Không hoạt động"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreBio;
