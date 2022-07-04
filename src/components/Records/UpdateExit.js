import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import axios from "axios"
import MovementContext from "../../contexts/MovementContext";

export default function Entry() {
  const [exit, setExit] = useState({
    value: "",
    description: "",
    type:"exit"
  });
  const {user} = useContext(UserContext)
  const {record} = useContext(MovementContext)

  const config = {
      headers:{
          Authorization:`bearer ${user.token}`
      }
  }
  
console.log(record)
  const navigate = useNavigate()
 

  function EditExit(event) {
    event.preventDefault();

    const promise = axios.put(`http://localhost:5000/record/${record._id}`, exit, config)
    promise.then(() => {
      navigate("/movements")
    })
    .catch(() => {
      alert("Dados inválidos")
    })
  }

  return (
    <>
      <div className="Container Action h-screen mt-5 ">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2>Editar saída</h2>
        </div>
        <form onSubmit={EditExit}>
          <input placeholder="Valor" onChange={(e) => setExit({ ...exit, value: e.target.value })}
            defaultValue={record.value} min="1" type="number"
          />
          <input placeholder="Descrição" onChange={(e) => setExit({ ...exit, description: e.target.value })}
            defaultValue={record.description} 
          />
           <button >Atualizar saída</button>
        </form>

     
      
      </div>
    </>
  );
}
