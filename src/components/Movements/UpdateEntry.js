import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import axios from "axios"

export default function Entry() {
  const [entry, setEntry] = useState({
    value: "",
    description: "",
  });
  const {user} = useContext(UserContext)

  const config = {
      headers:{
          Authorization:`bearer ${user.token}`
      }
  }
  

  const navigate = useNavigate()
  console.log(user.operation.type, user.operation.id)

  function EditEntry(event) {
    event.preventDefault();


    const promise = axios.put(`http://localhost:5000/entry/${user.operation.id}`, config)
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
          <h2>Editar entrada</h2>
        </div>
        <form onSubmit={EditEntry}>
          <input placeholder="Valor" onChange={(e) => setEntry({ ...entry, value: e.target.value })}
            value={entry.value}
          />
          <input placeholder="Descrição" onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            value={entry.description}
          />
           <button >Atualizar entrada</button>
        </form>

     
      
      </div>
    </>
  );
}
