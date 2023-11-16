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
              <h5 className="card-title bio-graph-title">Store information</h5>
              <p>
                <strong>Name:</strong> {thisStore.name}
              </p>
              <p>
                <strong>Phone:</strong> {thisStore.phone}
              </p>
              <p>
                <strong>Address:</strong> {thisStore.address}
              </p>
              <p>
                <strong>Day created:</strong> 13 July 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreBio;
