import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login(){
    const [body, setBody] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    function MakeLogin(event){
        event.preventDefault()

        navigate("/movements")
    }

    return (
        <>
        <div className="Container">
            <h1 className="text-white mb-5 text-3xl">My Wallet</h1>
           <form onSubmit={MakeLogin}>
                <input placeholder="E-mail" onChange={(event) => setBody({...body, email: event.target.value})} value={body.email}></input>
                <input placeholder="Senha"  onChange={(event) => setBody({...body, password: event.target.value})} value={body.password}></input>
                <button>Entrar</button>
           </form>
           <Link to="/register">
            <h3 className="text-white mt-12 text-base">Primeira vez? Cadastre-se</h3>
           </Link>
        </div>
        </>
    )
}
