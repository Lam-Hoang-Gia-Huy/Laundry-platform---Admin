import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";

function StoreService() {
  const { stores, setStores } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);

  let thisStore;

  thisStore = stores.find((prod) => prod.id === id);

  const [services] = useState(thisStore.services);
  return (
    <div className="container profile-container">
      <div className="row">
        <div className="col-md-9 profile-info">
          <div className="card bio-graph-card shadow-1">
            <div className="card-body bio-graph-body">
              <h5 className="card-title bio-graph-title">Store's Service</h5>
              <div className="d-flex flex-row justify-content-between">
                {services.map((item, index) => (
                  <div>
                    <p>
                      <strong>Type:</strong> {item.service_types}
                    </p>
                    <p>
                      <strong>Price:</strong> {item.price.toLocaleString()}₫
                    </p>
                    {item.weight && (
                      <p>
                        <strong>Weight:</strong> {item.weight}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreService;
