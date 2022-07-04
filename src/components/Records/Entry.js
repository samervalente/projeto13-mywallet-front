import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import axios from "axios"


export default function Entry() {
  const [entry, setEntry] = useState({
    value: "",
    description: "",
    type:"entry"
  });
  const {user} = useContext(UserContext)
 

  const config = {
      headers:{
          Authorization:`bearer ${user.token}`
      }
  }

  const navigate = useNavigate()

  function SaveEntry(event) {
    event.preventDefault();

    const promise = axios.post(`https://mywalletmachine.herokuapp.com/record`, entry, config)
    promise.then(() => {
      navigate("/records")
    })
    .catch(() => {
      alert("Dados inválidos")
    })
  }

  return (
    <>
      <div className="Container Action h-screen mt-5 ">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2>Nova entrada</h2>
        </div>
        <form onSubmit={SaveEntry}>
          <input placeholder="Valor" onChange={(e) => setEntry({ ...entry, value: e.target.value })}
            value={entry.value} min="1" type="number"
          />
          <input placeholder="Descrição" onChange={(e) => setEntry({ ...entry, description: e.target.value })}
            value={entry.description} 
          />
           <button >Salvar entrada</button>
        </form>

     
      
      </div>
    </>
  );
}
