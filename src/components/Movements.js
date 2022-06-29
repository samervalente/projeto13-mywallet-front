export default function Movements(){
    let arr = [
        {date:"29/06", description:"Açai", value:1450, type:"entry"},
        {date:"29/06", description:"Prato Feito", value:1275, type:"pudim"}

]

const movements = arr.map(item => 
 <li className="flex justify-between mb-3">
    <div className="flex">
        <p className="text-gray-400">{item.date}</p>
        <p className="ml-3">{item.description}</p>
    </div>
    {item.type === "entry" ? <p className="text-green-500">{(item.value/100).toFixed(2)}</p>: <p className="text-red-400">{(item.value/100).toFixed(2)}</p>}
    
</li>)

    return (
        <>
            <div className="Container h-screen">
                 <div className="flex justify-between items-center mb-3 w-full">
                        <h2>Olá, Samer</h2>
                        <ion-icon name="exit-outline"></ion-icon>
                 </div>
                 {arr.length === 0 ?
                 <ul className="bg-white flex items-center justify-center rounded h-3/5 w-full">
                    <p className="text-gray-400">Não há registros de entrada ou saída</p>:
                </ul>: 
                    <ul className="bg-white p-3 rounded h-3/5 w-full">
                            <p className="text-black ">
                                {movements}    
                            </p>:
                </ul>
                      
                    }
                <div className="Actions mt-3 flex justify-between w-full">
                    <div>
                        <ion-icon name="add-circle-outline"></ion-icon>
                        <p>Nova <br/> Entrada</p>    
                    </div>
                    <div>
                        <ion-icon name="remove-circle-outline"></ion-icon>
                        <p>Nova <br/> Saída</p>   
                    </div>
                </div>
            </div>
        </>
    )
}