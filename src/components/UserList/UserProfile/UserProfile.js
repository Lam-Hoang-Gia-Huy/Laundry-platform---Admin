import "./UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { BackButton } from "../../BackButton/BackButton";
import { useContext } from "react";
import { AppContext } from "../../../ContextProvider";
function UserProfile1() {
  const { users, setUsers } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);
  const thisUser = users.find((prod) => prod.id === id);
  return (
    <div className="container profile-container">
      <BackButton Root={"user"} />
      <div className="row">
        <div className="col-md-3 profile-nav">
          <div className="card profile-card">
            <div className="card-body text-center profile-heading">
              <img
                src={thisUser?.image}
                alt="avatar"
                className="profile-image rounded-circle"
              />
              <h5 className="card-title profile-title">{thisUser?.fullName}</h5>
            </div>
            <ul className="list-group list-group-flush profile-list">
              <li className="list-group-item active">
                <a href="#">
                  {" "}
                  <i class="fa fa-user"></i> Thông tin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-7 profile-info">
          <div className="card bio-graph-card shadow-1">
            <div className="card-body bio-graph-body">
              <h5 className="card-title bio-graph-title">
                Thông tin người dùng
              </h5>
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <p>
                    <strong>Họ và tên:</strong> {thisUser.fullName}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {thisUser.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {thisUser.email}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {thisUser.address}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Trạng thái: </strong>

                    {thisUser.status === 1 ? "Hoạt động" : "Không hoạt động"}
                  </p>
                  <p>
                    <strong>Vai trò: </strong>
                    {thisUser.role === "STORE" ? "Cửa hàng" : "Khách hàng"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile1;
