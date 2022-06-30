import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/userContext";

import Login from "./Login/Login";
import Register from "./Login/Register";
import HistoryMovements from "./Movements/HistoryMovements";
import Entry from "./Movements/Entry";
import Exit from "./Movements/Exit";

export default function App() {
  const [user, setUser] = useState({
    name: "",
    token: "",
  });

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movements" element={<HistoryMovements />} />
            <Route path="/entry" element={<Entry />} />
            <Route path="/exit" element={<Exit />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
