import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers"

export default function Register(){
    const [body, setBody] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [confirm, setConfirm] = useState("")
    const [validate, setValidate] = useState(false)

   
    useEffect(() => {
      
        if(confirm === body.password && body.password !== ""){
            setValidate(true)
        }
        if(confirm !== body.password){
            setValidate(false)
        }
        
    })

    

    function Register(event){
        event.preventDefault();
        const promise = axios.post("http://localhost:5000/register", body)
        promise.then((response) => {
            console.log(response.data)
        }).catch((e) => {
            console.log(e)
            if(e.response.status === 422){
                alert("Dados inválidos")
            }

            if(e.response.status === 409){
                alert("Usuário já registrado.")
            }
        })

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
               {validate ?  <button className="bg-violet-500" type="submit">Cadastrar</button> :  
                <div className="w-full relative">
                <button type="button" disabled className="bg-white opacity-80 text-violet-500">
                    Senhas não conferem 
                </button>
                <ion-icon className="absolute left-0.5" name="alert-circle-outline"></ion-icon>
                </div>
                
             
               }
          </form>
           <Link to="/">
            <h3 className="text-white my-5 text-base">Já possui uma conta? Entre agora!</h3>
           </Link>
        </div>
        </>
    )
}