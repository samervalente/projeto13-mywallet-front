import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import axios from "axios"
import MovementContext from "../../contexts/MovementContext";

export default function Entry() {
  const [entry, setEntry] = useState({
    value: "",
    description: "",
    type:"entry"
  });
  const {user} = useContext(UserContext)
  const {record} = useContext(MovementContext)

  const config = {
      headers:{
          Authorization:`bearer ${user.token}`
      }
  }
  

  const navigate = useNavigate()
  
  function EditEntry(event) {
    event.preventDefault();
    
    
    const promise = axios.put(`https://mywalletmachine.herokuapp.com/record/${record._id}`, entry, config)
    promise.then(() => {
      navigate("/records")
    })
    .catch(() => {
      alert("Dados inválidos")
    })
  }

  return (
    <>
      <div className="Container Action h-screen msamervalente@gmail.comt-5 ">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2>Editar entrada</h2>
        </div>
        <form onSubmit={EditEntry}>
          <input placeholder="Valor" onChange={(e) => setEntry({ ...entry, value: e.target.value })}
            defaultValue={record.value} min="1" type="number"
          />
          <input placeholder="Descrição" onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            defaultValue={record.description}
          />
           <button >Atualizar entrada</button>
        </form>

     
      
      </div>
    </>
  );
}
