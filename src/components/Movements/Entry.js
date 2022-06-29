import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Entry() {
  const [entry, setEntry] = useState({
    value: "",
    description: "",
  });

  const navigate = useNavigate()

  function SaveEntry(event) {
    event.preventDefault();
    navigate("/movements")

  }

  return (
    <>
      <div className="Container Action h-screen mt-5 ">
        <div className="flex justify-between items-center mb-6 w-full">
          <h2>Nova entrada</h2>
        </div>
        <form onSubmit={SaveEntry}>
          <input placeholder="Valor" onChange={(e) => setEntry({ ...entry, value: e.target.value })}
            value={entry.value}
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
