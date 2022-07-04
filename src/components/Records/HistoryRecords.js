import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import UserContext from "../../contexts/userContext"
import MovementContext from "../../contexts/MovementContext"

export default function Movements(){
    const [movements, setMovements] = useState([])
  
    const {user, setUser} = useContext(UserContext)
    const {setRecord} = useContext(MovementContext)

    const config = {
        headers:{
            Authorization:`bearer ${user.token}`
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        const promise = axios.get("http://localhost:5000/records", config)
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

   

    async function deleteMovement(id){
        const confirm = window.confirm("Você deseja deletar este registro?")
        if(confirm){
            const deleteRecord = movements.find(record => record._id === id)
           
             await axios.delete(`http://localhost:5000/record/${deleteRecord._id}`, config)
             const userRecords = await axios.get(`http://localhost:5000/records`,config)
    
             setMovements(userRecords.data)  
        }
   
    }

    function getUpdateMovementID(id){
        const Movement = movements.find(record => record._id === id)
        setRecord({...Movement})
        Movement.type === "entry" ?  navigate("/updateEntry") :  navigate("/updateExit")   
    }

    const userMovements = movements.map(item => 
         <li  key={item._id} className="flex justify-between items-center mb-4 cursor-pointer w-full ">
          <div onClick={() => getUpdateMovementID(item._id)} className="flex justify-between w-full">
            <div className="flex">
                <p className="text-gray-400">{item.date}</p>
                <p className="ml-3">{item.description}</p>
            </div>
            <div className="flex items-center">
                {item.type === "entry" ? 
                <p className="text-green-500">{Number(item.value).toFixed(2).replace(".",",")}
                </p> : 
                <p className="text-red-500">{Number(item.value).toFixed(2).replace(".",",")}</p>}   
            </div>
          </div>
        <ion-icon onClick={() => deleteMovement(item._id)} name="close-outline"></ion-icon>
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
                                <p className={`${user.balance > 0 ? "text-green-500" : "text-red-500"}`}>{Number(user.balance).toFixed(2).replace(".",",")}</p>
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