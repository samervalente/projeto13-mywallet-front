import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/userContext";
import axios from "axios"

export default function Exit() {
  const [exit, setExit] = useState({
    value: "",
    description: "",
    type:"exit"
  });
  const {user} = useContext(UserContext)
  const config = {
    headers:{
        Authorization:`bearer ${user.token}`
    }
}

  const navigate = useNavigate()

  function SaveExit(event) {
    event.preventDefault();
    if(user.balance === 0 ){
      alert(`Sua saída é maior que seu saldo (${user.balance})`)
      navigate("/records")
    }

    else if(exit.value > user.balance){
      alert(`Sua saída é maior que seu saldo (${user.balance})`)
    }else{
      const promise = axios.post(" https://mywalletmachine.herokuapp.com/ /record", exit, config)
    promise
    .then(() => {
      navigate("/records")
    })
    .catch(() => {
      alert("Dados inválidos")
    })
    }

  }

  return (
    <>
      <div className="Container Action h-screen mt-5 ">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2>Nova saída</h2>
        </div>
        <form onSubmit={SaveExit}>
          <input placeholder="Valor" onChange={(e) => setExit({ ...exit, value: e.target.value })}
            value={exit.value} min="1" type="number"
          />
          <input placeholder="Descrição" onChange={(e) => setExit({ ...exit, description: e.target.value })}
            value={exit.description} 
          />
           <button >Salvar saída</button>
        </form>
      </div>
    </>
  );
}
