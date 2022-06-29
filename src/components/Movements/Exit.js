import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Exit() {
  const [exit, setExit] = useState({
    value: "",
    description: "",
  });

  const navigate = useNavigate()

  function SaveExit(event) {
    event.preventDefault();

    navigate("/movements")

  }

  return (
    <>
      <div className="Container Action h-screen mt-5 ">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2>Nova saída</h2>
        </div>
        <form onSubmit={SaveExit}>
          <input placeholder="Valor" onChange={(e) => setExit({ ...exit, value: e.target.value })}
            value={exit.value}
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
