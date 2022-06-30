import {useEffect, useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


export default function Register(){
    const [body, setBody] = useState({
        name:"",
        email:"",
        password:"",
    })
    const [confirm, setConfirm] = useState("")
    const [validate, setValidate] = useState("init")
    const [error, setError] = useState(false)
   const navigate = useNavigate()

    useEffect(() => {
        if(confirm === body.password && body.password !== ""){
            setValidate(true)
        }
        if(confirm !== body.password){
            setValidate(false)
        } 
    },[confirm, body.password])

    
    function Register(event){
        event.preventDefault();
        const promise = axios.post("http://localhost:5000/register", body)
        promise.then(() => {
            navigate("/")
        }).catch((e) => {
            console.log(e)
            if(e.response.status === 422 || validate === "init"){
                setError(422)
            }

            if(e.response.status === 409){
                setError(409)
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

                {error === 422? <p className="text-white mb-3">Dados inválidos</p>: null}
                {error === 409? <p className="text-white mb-3">Usuário já registrado</p>: null}

               {validate ?  <button className="bg-violet-500" type="submit">Cadastrar</button> :  
                <div className="w-full relative errorVerify">
                <button type="button" disabled className="bg-white opacity-80 text-violet-500">
                    Senhas não conferem 
                </button>
                <ion-icon  name="alert-circle"></ion-icon>
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