import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import "./OrderDetail.css";
import { BackButton } from "../BackButton/BackButton";
import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import { useContext } from "react";
import { AppContext } from "../../ContextProvider";
export default function OrderDetails() {
  const { orders, setOrders } = useContext(AppContext);
  let { id } = useParams();
  id = Number(id);
  const thisorder = orders.find((prod) => prod.id === id);
  const [services, setservices] = useState(thisorder.services);
  return (
    <>
      <section className="h-100 h-custom">
        <BackButton Root={"order"} />
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="8" xl="6">
              <MDBCard className="border-top border-bottom border-3 border-color-custom MDBCard">
                <MDBCardBody className="p-5">
                  <p className="lead fw-bold mb-5" style={{ color: "#f37a27" }}>
                    Purchase Receipt
                  </p>
                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">User</p>
                      <p>{thisorder.username}</p>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Date</p>
                      <p>{thisorder.date}</p>
                    </MDBCol>
                    <MDBCol className="mb-3">
                      <p className="small text-muted mb-1">Order No.</p>
                      <p>{thisorder.id}</p>
                    </MDBCol>
                  </MDBRow>

                  <div
                    className="mx-n5 px-5 py-4"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    {services.map((item, index) => (
                      <MDBRow>
                        <MDBCol md="8" lg="9">
                          <p>{item.service_types}</p>
                        </MDBCol>
                        <MDBCol md="4" lg="3">
                          <p>{item.price.toLocaleString()}₫</p>
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </div>
                  <MDBRow className="my-4">
                    <MDBCol md="4" className="offset-md-8 col-lg-3 offset-lg-9">
                      <p
                        className="lead fw-bold mb-0"
                        style={{ color: "#f37a27" }}
                      >
                        {thisorder.totalprice.toLocaleString()}₫
                      </p>
                    </MDBCol>
                  </MDBRow>
                  <p
                    className="lead fw-bold mb-4 pb-2"
                    style={{ color: "#f37a27" }}
                  >
                    Tracking Order
                  </p>
                  <MDBRow>
                    <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                      {thisorder.status === "washing" ? (
                        <span className="d-flex justify-content-center align-items-center big-dot dot">
                          <MDBIcon icon="check text-white" />
                        </span>
                      ) : (
                        <span className="dot"></span>
                      )}

                      <hr className="flex-fill track-line" />
                      {thisorder.status === "delivering" ? (
                        <span className="d-flex justify-content-center align-items-center big-dot dot">
                          <MDBIcon icon="check text-white" />
                        </span>
                      ) : (
                        <span className="dot"></span>
                      )}
                      <hr className="flex-fill track-line" />
                      {thisorder.status === "delivered" ||
                      thisorder.status === "cancel" ? (
                        <span className="d-flex justify-content-center align-items-center big-dot dot">
                          {thisorder.status === "delivered" ? (
                            <MDBIcon icon="check text-white" />
                          ) : (
                            <MDBIcon icon="times text-white" />
                          )}
                        </span>
                      ) : (
                        <span className="dot"></span>
                      )}
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div className="d-flex flex-column align-items-start">
                        <span>Washing</span>
                      </div>

                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <span>Shipping</span>
                      </div>

                      <div className="d-flex flex-column align-items-end">
                        {thisorder.status === "cancel" ? (
                          <span>Cancel</span>
                        ) : (
                          <span>Delivered</span>
                        )}
                      </div>
                    </div>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
