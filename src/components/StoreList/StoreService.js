import "../UserList/UserProfile/UserProfile.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function StoreService() {
  let { id } = useParams();
  id = Number(id);
  const [specialServices, setSpecialServices] = useState([]);
  const [standardServices, setStandardServices] = useState([]);
  React.useEffect(() => {
    axios
      .get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/special-service/store/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setSpecialServices(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        `https://magpie-aware-lark.ngrok-free.app/api/v1/base/standard-service/store/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setStandardServices(response.data.details);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container profile-container">
      <div className="row">
        <div className="col-md-12 profile-info">
          <div className="card bio-graph-card shadow-1">
            <div className="card-body bio-graph-body">
              <h3 className="card-title bio-graph-title">
                Dịch vụ của cửa hàng
              </h3>
              {specialServices && specialServices.length > 0 ? (
                <>
                  <h4>Dịch vụ quần áo đặc biệt</h4>
                  <div className="d-flex flex-row justify-content-start flex-wrap">
                    {specialServices.map((item, index) => (
                      <div className="p-2" key={index}>
                        <p>
                          <strong>Tên dịch vụ:</strong> {item.name}
                        </p>
                        <p>
                          <strong>Giá tiền:</strong>{" "}
                          {item.details[0].price.toLocaleString()}₫
                        </p>
                        <p>
                          <strong>Chất liệu: </strong>
                          {item.materials?.map((item, index) => (
                            <span key={index}>{item?.name} </span>
                          ))}
                        </p>
                        <p>
                          <strong>Loại vải:</strong> {item.cloth.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {standardServices && standardServices.length > 0 ? (
                <>
                  <h4>Dịch vụ quần áo thông thường</h4>
                  <div className="d-flex flex-row justify-content-start flex-wrap">
                    {standardServices.map((item) => (
                      <div className="p-2">
                        <p>
                          <strong>Từ:</strong> {item.from}
                        </p>
                        <p>
                          <strong>Đến:</strong> {item.to}
                        </p>
                        <p>
                          <strong>Giá tiền:</strong>{" "}
                          {item.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StoreService;
