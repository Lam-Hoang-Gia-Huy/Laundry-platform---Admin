import React from "react";
import axios from "axios";
// Create a context
const AppContext = React.createContext();

// Create a provider component
function AppProvider({ children }) {
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [stores, setStores] = React.useState([]);
  const [material, setMaterial] = React.useState([]);
  const [cloth, setCloth] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/base/staff/accepted-order",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("https://magpie-aware-lark.ngrok-free.app/api/v1/base/store/all", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setStores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        "https://magpie-aware-lark.ngrok-free.app/api/v1/base/material/all",
        {
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        setMaterial(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get("https://magpie-aware-lark.ngrok-free.app/api/v1/base/cloth/all", {
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        setCloth(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        orders,
        setOrders,
        users,
        setUsers,
        stores,
        setStores,
        material,
        setMaterial,
        cloth,
        setCloth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
