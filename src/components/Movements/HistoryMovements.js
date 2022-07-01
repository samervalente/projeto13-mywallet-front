import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import UserContext from "../../contexts/userContext"

export default function Movements(){
    const [movements, setMovements] = useState([])
  
    const {user, setUser} = useContext(UserContext)

    const config = {
        headers:{
            Authorization:`bearer ${user.token}`
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        const promise = axios.get("http://localhost:5000/movements", config)
        promise.then((response) => {
            setMovements(response.data)
        })
    }, [])

    useEffect(() => {
        const promise = axios.get("http://localhost:5000/balance",config)
        promise.then((response) => {
            setUser({...user, balance:response.data.balance})
        })
    })

    function deleteMovement(id){
        const confirm = window.confirm("Você deseja deletar este registro?")
        if(confirm){
            const deleteMovement = movements.find(movement => movement._id === id)
            const idMovement = deleteMovement._id
    
            const promise = axios.delete(`http://localhost:5000/movement/${idMovement}`, config)
            promise.then((response) => {
                axios.get("http://localhost:5000/movements", config)
                setMovements(response.data)
            })
        }

        
    }


    function getUpdateMovementID(id, type){
        const Movement = movements.find(movement => movement._id === id)
        user.operation.id = Movement._id

       type === "entry" ?  navigate("/updateEntry") :  navigate("/updateExit")
        
    }

    const userMovements = movements.map(item => 
        <li onClick={() => getUpdateMovementID(item._id, item.type)} key={item._id} className="flex justify-between mb-4 cursor-pointer">
           <div className="flex">
               <p className="text-gray-400">{item.date}</p>
               <p className="ml-3">{item.description}</p>
           </div>
           <div className="flex items-center">
               {item.type === "entry" ? 
               <p className="text-green-500">{item.value}
               </p> : 
               <p className="text-red-500">{item.value}</p>}
               <ion-icon onClick={() => deleteMovement(item._id)} name="close-outline"></ion-icon>
           </div>
           
       </li>
       )
       
    return (
        <>
            <div className="Container h-screen">
                 <div className="flex justify-between items-center mb-3 w-full">
                        <h2>Olá, {user.name}</h2>
                        <Link to="/">
                            <ion-icon name="exit-outline"></ion-icon>
                        </Link>
                 </div>
                 {movements.length === 0 ?
                 <ul className="bg-white flex items-center justify-center rounded h-3/5 w-full">
                    <p className="text-gray-400">Não há registros de entrada ou saída</p>
                  
                </ul>: 
                    <ul className="bg-white p-3 rounded h-3/5 w-full flex flex-col justify-between">
                            <div className="MovementsSection overflow-scroll">
                                {userMovements}
                            </div>
                            <div className="flex justify-between">
                                <p className="font-bold text-xl">Saldo</p>
                                <p className="text-green-500">{user.balance}</p>
                            </div>    
                            
                </ul>
                      
                    }
                <div className="Actions mt-3 flex justify-between w-full">
                    <div>
                       <Link to="/entry">
                        <ion-icon name="add-circle-outline"></ion-icon>
                      
                        <h3>Nova <br/> Entrada</h3>    
                        </Link>

                    </div>
                    <div>
                        <Link to="/exit">
                        <ion-icon name="remove-circle-outline"></ion-icon>          
                        <h3>Nova <br/> Saída</h3>
                        </Link>     
                    </div>
                </div>
            </div>
        </>
    )
}