

import "./ItemDetail.scss"
import { useContext, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"



const ItemDetail = ({item}) => {

    const { agregarAlCarrito, isInCart } = useContext(CartContext)

    const [cantidad, setCantidad] = useState(1)

    const handleAgregar = () => {
        const newItem = {
            ...item,
            cantidad
        }

        agregarAlCarrito(newItem)
    }



    const parseText = (string) => {
        const text = string.split('\n')
    
        return <p>
            {
                text.map(p => (
                    <>{p}<br/></>
                ))
            }
        </p>
    }

   

    return (
        <div className="detail_card">
            <img className="imgDetail" src={item.img} alt={item.nombre}/>
            <div className="detail_info">
                <h2 className="detail_titulo">{item.nombre}</h2>            
                {/* <div dangerouslySetInnerHTML={{ __html: item.descripcion }} /> */}                  
                {parseText("hola \n soy \n lunzi")}
                <p className="detail_price">Price: ${item.precio}</p>
                {/* <button className='add'>Add to Cart</button> */}
            </div>
            <div className="buttons_section">
                {
                    isInCart(item.id)
                        ? <Link className="buttons" to="/cart">Terminar mi compra</Link>
                        : <ItemCount 
                            max={item.stock}
                            cantidad={cantidad}
                            setCantidad={setCantidad}
                            agregar={handleAgregar}
                        />
                }            
            </div>
            
        </div>
    )
}

export default ItemDetail











import "./ItemDetail.scss"
import { useContext, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"



const ItemDetail = ({item}) => {

    const { agregarAlCarrito, isInCart } = useContext(CartContext)

    const [cantidad, setCantidad] = useState(1)

    const handleAgregar = () => {
        const newItem = {
            ...item,
            cantidad
        }

        agregarAlCarrito(newItem)
    }



    const parseText = (string) => {
        const text = string.split('\n')
        
        return (
            <div>
                {
                    text.map((p, index) => (
                        <div key={index}>
                            <p>{p}</p>
                            <br/>
                        </div>
                    ))
                }
                
            </div>
        )
    }

    

    return (
        <div className="detail_card">
            <img className="imgDetail" src={item.img} alt={item.nombre}/>
            <div className="detail_info">
                <h2 className="detail_titulo">{item.nombre}</h2>            
                {/* <div dangerouslySetInnerHTML={{ __html: item.descripcion }} /> */}
                {parseText("esto \n separa \n cosas")}
                {parseText(item.descripcion)}                
                <p className="detail_price">Price: ${item.precio}</p>
                {/* <button className='add'>Add to Cart</button> */}
            </div>
            <div className="buttons_section">
                {
                    isInCart(item.id)
                        ? <Link className="buttons" to="/cart">Terminar mi compra</Link>
                        : <ItemCount 
                            max={item.stock}
                            cantidad={cantidad}
                            setCantidad={setCantidad}
                            agregar={handleAgregar}
                        />
                }            
            </div>
            
        </div>
    )
}

export default ItemDetail