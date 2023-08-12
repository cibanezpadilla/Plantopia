
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './PortadaCat.scss'



const PortadaCat = () => {
    const fotos= [
        {           
            category: "indoor",
            titulo: "Indoor Plants",
            img: "../../indoor.jpg"
        },
        {
            category: "outdoor", 
            titulo: "Outdoor Plants",           
            img: "../../outdoor2.jpg"
        },
        {
            category: "cactiesSucculents", 
            titulo: "Cacti and Succulents",           
            img: "../../cactus2.jpg"
        },
        {
            category: "all",     
            titulo: "All Plants",       
            img: "../../all2.jpg"
        }
    ]


    const [portada, setPortada] = useState("")    

    const { categoryId } = useParams()
    
    if (categoryId == "indoor" || categoryId == "outdoor" || categoryId == "cactiesSucculents" || categoryId == "all") {
        useEffect(() => {
            
                setPortada( fotos.find(pic => pic.category === categoryId) )                            
            }
            
    , [categoryId])                            
    }else {
        useEffect(() => {
            
            setPortada( fotos.find(pic => pic.category === "all") )                            
        }
        
    , [categoryId])
        }     
    

    const estilos = {
        backgroundImage: `url(${portada.img})`,
        backgroundSize: 'cover',        
    }
   


    return (
        
        <div className=''>
            {portada && <div className="imgPort" style={estilos}>
                            <h2 className='titulo_portada'>{portada.titulo}</h2>                            
                        </div>}                         
        </div>
    )
}

export default PortadaCat