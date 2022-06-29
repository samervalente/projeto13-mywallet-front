import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {axios} from "axios"

export default function Register(){
    const [body, setBody] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [confirm, setConfirm] = useState("")
   
    function Register(event){
        event.preventDefault();

        const promise = axios.post("http://localhost:5000/register")

    }

    return (
        <>
        <div className="Container">
            <h1 className="text-white mb-5 text-3xl">My Wallet</h1>
          <form onSubmit={Register}>
                <input placeholder="Nome" onChange={(e) => setBody({...body, name:e.target.value})}></input>
                <input placeholder="E-mail" onChange={(e) => setBody({...body, email:e.target.value})}></input>
                <input placeholder="Senha" onChange={(e) => setBody({...body, password:e.target.value})}></input>
                <input placeholder="Confirme a senha" onChange={(e) => {setConfirm(e.target.value)}}></input>
                <button>Cadastrar</button>
          </form>
           <Link to="/">
            <h3 className="text-white my-5 text-base">Já possui uma conta? Entre agora!</h3>
           </Link>
        </div>
        </>
    )
}