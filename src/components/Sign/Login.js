import {useState, useContext} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import UserContext from "../../contexts/userContext"

export default function Login(){
    const [body, setBody] = useState({
        email:"",
        password:""
    })
    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    function MakeLogin(event){
        event.preventDefault()

        const promise = axios.post("http://localhost:5000/login", body)
        promise
        .then((response) => {
            setUser(response.data)
            navigate("/movements")
        })
        .catch(() => {
            alert("Email ou senha incorreta")
        })
       
    }

 
    return (
        <>
        <div className="Container">
            <h1 className="text-white mb-5 text-3xl">My Wallet</h1>
           <form onSubmit={MakeLogin}>
                <input placeholder="E-mail" type="email" onChange={(event) => setBody({...body, email: event.target.value})} value={body.email}></input>
                <input placeholder="Senha" type="password"  onChange={(event) => setBody({...body, password: event.target.value})} value={body.password}></input>
                <button>Entrar</button>
           </form>
           <Link to="/register">
            <h3 className="text-white mt-12 text-bas">Primeira vez? Cadastre-se</h3>
           </Link>
        </div>
        </>
    )
}
