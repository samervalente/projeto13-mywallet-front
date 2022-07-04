import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/userContext";
import MovementContext from "../contexts/MovementContext"

import Login from "./Sign/Login";
import Register from "./Sign/Register";
import HistoryRecords from "./Records/HistoryRecords";
import Entry from "./Records/Entry";
import Exit from "./Records/Exit";
import UpdateEntry from "./Records/UpdateEntry"
import UpdateExit from "./Records/UpdateExit"

export default function App() {
  const [user, setUser] = useState({
    name: "",
    token: "",
    balance:"",
  });
  const [record, setRecord] = useState({type:"", value:"", description:"", id:""})

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
       <MovementContext.Provider value={{record, setRecord}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
              <Route path="/movements" element={<HistoryRecords />} />
              <Route path="/entry" element={<Entry />} />
              <Route path="/exit" element={<Exit />} />
              <Route path="/updateEntry" element={<UpdateEntry/>}/>
              <Route path="/updateExit" element={<UpdateExit/>}/>    
          </Routes>
        </BrowserRouter>
        </MovementContext.Provider>
      </UserContext.Provider>
    </>
  );
}
