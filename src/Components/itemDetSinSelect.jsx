

import "./ItemDetail.scss"
import { useContext, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
/* import { Link } from "react-router-dom" */
import { toCapital } from '../../helpers/toCapital.js'



const ItemDetail = ({item}) => {

    const { agregarAlCarrito, nuevoMax, enCart, isInCart, setCart, cart } = useContext(CartContext)

    const [cantidad, setCantidad] = useState(1)
    /* const [cantidadMas, setCantidadMas] = useState(1) */
/* 
    const handleAgregar = () => {
        const newItem = {
            ...item,
            cantidad
        }
        agregarAlCarrito(newItem)        
        console.log("handleAgregar")
    } */


    const handleAgregar = () => {
        const newItem = {
          ...item,
          cantidad,
        };
      
        /* le puse el and para despues poner itemCart.tamanio === newItem.tamanio    */     
        const itemIndex = cart.findIndex((itemCart) => itemCart.id === newItem.id && itemCart.nombre === newItem.nombre);
        
      
        if (itemIndex !== -1) {
          // El elemento ya está en el carrito, actualizamos su cantidad y tambien actualizo tamanio
          const updatedCarrito = [...cart];
          updatedCarrito[itemIndex].cantidad += cantidad;          
          setCart(updatedCarrito);
          setCantidad(1)
          
        } else {
          // El elemento no está en el carrito, lo agregamos
          agregarAlCarrito(newItem);
          setCantidad(1)
        }
      };

   


    const parseText = (string) => {
        string = string.replaceAll('\\n', '\n')
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
                <h2 className="detail_titulo">{toCapital(item.nombre)}</h2>                               
                {item && parseText(item.descripcion)}
                <p className="detail_price">Price: ${item.precio}</p>                
                <div className="buttons_section">
                    {/* {
                        isInCart(item.id)
                            ? <div>
                                <ItemCount 
                                max={nuevoMax(item)}
                                cantidad={cantidad}
                                setCantidad={setCantidad}
                                agregar={handleAgregar}/>
                                <Link className="buttons" to="/cart">Terminar mi compra</Link>
                            </div>
                        
                            : <ItemCount 
                                max={nuevoMax(item)}
                                cantidad={cantidad}
                                setCantidad={setCantidad}
                                agregar={handleAgregar}
                            />
                    } */}                    
                    {
                        nuevoMax(item) == 0
                            ? <>
                            <p className="block">Product out of stock</p>
                            <p>You already have {enCart(item)}{enCart(item) > 1? " items" : " item"} of this product in cart</p>                            
                            </>
                            : <>
                            <ItemCount className="botonera"                            
                            max={nuevoMax(item)}
                            cantidad={cantidad}
                            setCantidad={setCantidad}
                            agregar={handleAgregar}
                            />
                            {isInCart(item.id)&& <p>You already have {enCart(item)}{enCart(item) > 1? " items" : " item"} of this product in cart</p>} 
                            </>
                    }
                </div>
            </div>            
        </div>
    )
}

export default ItemDetail



/* return (
    <div className="detail_card">
        <img className="imgDetail" src={item.img} alt={item.nombre}/>
        <div className="detail_info">
            <h2 className="detail_titulo">{item.nombre}</h2>            
                           
            {parseText(item.descripcion)}                
            <p className="detail_price">Price: ${item.precio}</p>
            
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
    </div>
) */