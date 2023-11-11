import React from "react";
import axios from "axios";
// Create a context
const AppContext = React.createContext();

// Create a provider component
function AppProvider({ children }) {
  const [orders, setOrders] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [stores, setStores] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
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
      .get("http://localhost:3000/stores")
      .then((response) => {
        setStores(response.data);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
