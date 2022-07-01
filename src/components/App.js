import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/userContext";

import Login from "./Login/Login";
import Register from "./Login/Register";
import HistoryMovements from "./Movements/HistoryMovements";
import Entry from "./Movements/Entry";
import Exit from "./Movements/Exit";
import UpdateEntry from "./Movements/UpdateEntry"
import UpdateExit from "./Movements/UpdateExit"

export default function App() {
  const [user, setUser] = useState({
    name: "",
    token: "",
    balance:"",
    operation:{
      type:"",
      id:""
    }
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
            <Route path="/updateEntry" element={<UpdateEntry/>}/>
            <Route path="/updateExit" element={<UpdateExit/>}/>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
