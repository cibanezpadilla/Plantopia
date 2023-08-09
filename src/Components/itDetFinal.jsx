import "./ItemDetail.scss"
import { useContext, useEffect, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
/* import { Link } from "react-router-dom" */
import { toCapital } from '../../helpers/toCapital.js'
import SelectTamanio from "../SelectTamanio/SelectTamanio"


const ItemDetail = ({item}) => {

    const { agregarAlCarrito, nuevoMax, enCart, isInCart, setCart, cart } = useContext(CartContext)

    const [cantidad, setCantidad] = useState(1)
    const [tamanio, setTamanio] = useState(null)
    const [multiplier, setMultiplier] = useState(1)
    const [precio, setPrecio] = useState(item.precio)
    console.log(tamanio, multiplier, precio)
   
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
          precioFinal: precio,
          tamanioSeleccionado: tamanio
        };
      
        /* le puse el and para despues poner itemCart.tamanio === newItem.tamanio    */     
        const itemIndex = cart.findIndex((itemCart) => itemCart.id === newItem.id && itemCart.tamanioSeleccionado === newItem.tamanioSeleccionado);
        
      
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

    useEffect(() => {
        setPrecio(item.precio * multiplier)
    }, [multiplier])


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


    const enCartCantidadTotalTamanios = () => {
        const esteItemEnCart = cart.filter((itemCart) => itemCart.id === item.id);
        const totalCantItem = esteItemEnCart.reduce((acc, item) => acc + item.cantidad, 0)
        return totalCantItem        
    }


    const nuevoMaxconTamanio = () => {
        const esteItemEnCart = cart.filter((itemCart) => itemCart.id === item.id);
        const totalCantItem = esteItemEnCart.reduce((acc, item) => acc + item.cantidad, 0)        
        return (item.stock - totalCantItem)        
    }

    
    
    return (
        <div className="detail_card">
            <img className="imgDetail" src={item.img} alt={item.nombre}/>
            <div className="detail_info">
                <h2 className="detail_titulo">{toCapital(item.nombre)}</h2>                               
                {item && parseText(item.descripcion)}
                <p className="detail_price">Price: ${precio}</p>                
                <div className="buttons_section">
                <SelectTamanio options={item.tamanios} setTamanio={setTamanio} setMultiplier={setMultiplier}/>
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
                        nuevoMaxconTamanio() == 0
                            ? <>
                            <p className="block">Product out of stock</p>
                            <p>You already have {enCartCantidadTotalTamanios()}{enCartCantidadTotalTamanios() > 1? " items" : " item"} in this {tamanio} size of this product in cart</p>                            
                            </>
                            : <>
                            <ItemCount className="botonera"                            
                            max={nuevoMaxconTamanio()}
                            cantidad={cantidad}
                            setCantidad={setCantidad}
                            agregar={handleAgregar}
                            />
                            {isInCart(item.id)&& <p>You already have {enCartCantidadTotalTamanios()}{enCartCantidadTotalTamanios() > 1? " items" : " item"} in this {tamanio} of this product in cart</p>} 
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