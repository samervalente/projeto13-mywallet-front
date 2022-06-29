import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../components/Login"
import Register from "./Register"
import Movements from "./Movements"

export default function App(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movements" element={<Movements />}/>
            </Routes>
        </BrowserRouter>
          
            
        </>
    )
}