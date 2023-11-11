import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BackButton } from "../BackButton/BackButton";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
function StoreProfile() {
  const { stores } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);

  let thisStore;
  thisStore = stores.find((prod) => prod.id === id);
  const [activeLink, setActiveLink] = useState("Profile");
  return (
    <div className="container profile-container">
      <BackButton
        Root={thisStore.status === "pending" ? "storemanager" : "store"}
      />
      <div className="row">
        <div className="col-md-3 profile-nav">
          <div className="card profile-card">
            <div className="card-body text-center profile-heading">
              <h5 className="card-title profile-title">
                {thisStore.storename}
              </h5>
            </div>
            <ul className="list-group list-group-flush profile-list">
              <li
                className={`list-group-item ${
                  activeLink === "Profile" ? "active" : ""
                }`}
              >
                <Link
                  to={`/storeDetails/${thisStore.id}/bio`}
                  onClick={() => setActiveLink("Profile")}
                >
                  <i className="fa fa-user"></i> Profile
                </Link>
              </li>
              <li
                className={`list-group-item ${
                  activeLink === "Service" ? "active" : ""
                }`}
              >
                <Link
                  to={`/storeDetails/${thisStore.id}/service`}
                  onClick={() => setActiveLink("Service")}
                >
                  <i className="fa fa-calendar"></i> Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreProfile;
