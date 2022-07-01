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

                <input placeholder="Nome" type="name" onChange={(e) => setBody({...body, name:e.target.value})}
                value={body.name}/>
                <input placeholder="E-mail" type="email" onChange={(e) => setBody({...body, email:e.target.value})}
                value={body.email}/>
                <input placeholder="Senha" type="password" onChange={(e) => setBody({...body, password:e.target.value})}value={body.password}/>
                <input placeholder="Confirme a senha" onChange={(e) => {setConfirm(e.target.value)}} />

                {error === 422? <p className="text-white mb-3">Dados inválidos</p>: null}
                {error === 409? <p className="text-white mb-3">Usuário já registrado</p>: null}

               {validate ?  
                    <button className="bg-violet-500" type="submit">Cadastrar</button> :
                    <div  className="w-full errorVerify bg-white opacity-80 text-violet-500 rounded h-12 flex items-center justify-center">
                        Senhas não conferem
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