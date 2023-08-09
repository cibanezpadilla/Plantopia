import { useContext, useEffect } from "react"
import { WishContext } from "../../context/WishContext"
import { CartContext } from "../../context/CartContext"
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { toCapital } from '../../helpers/toCapital.js'
import ItemCount from "../ItemCount/ItemCount"
import SelectTamanio from "../SelectTamanio/SelectTamanio" 

import './WishCard.scss'

const WishCard = ({item}) => {

    const { wish, removeFromWish } = useContext(WishContext)
        const { agregarAlCarrito, cantidad, 
            setCantidad,
            totalStock,
            tamanio, 
            setTamanio,
            multiplier, 
            setMultiplier,
            precio, 
            setPrecio,
            stock, 
            setStock, nuevoMaxsegunTamanio, isInCartSegunTamanio, enCartsegunTamanio, setCart, cart } = useContext(CartContext)




    const handleAgregar = () => {
        const newItem = {
            ...item,
            cantidad,
            precioFinal: precio,
            tamanioSeleccionado: tamanio
        };
                
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
        setCantidad(1)
    },[multiplier])

    

    
    return (
            <div className="wish_card" key={item.id}>
                <h3 className="wish-card_title">{toCapital(item.nombre)}</h3>
                <img className="wish_img" src={item.img} alt={item.nombre}/>
                <button onClick={() => removeFromWish(item.id)} className="btn btn-danger"><FaTrashAlt/></button>                            
                <p>Price: ${item.precioFinal}</p>
                <SelectTamanio options={item.tamanios} setTamanio={setTamanio} setMultiplier={setMultiplier} setStock={setStock}/>                            
                {
                    nuevoMaxsegunTamanio(item) == 0
                        ? <>
                        <p>Product out of stock, check different sizes!</p>
                        <p>You already have {enCartsegunTamanio(item)}{enCartsegunTamanio(item) > 1? " items" : " item"} in {tamanio} size of this product in cart</p>                            
                        </>
                        : <>
                        <ItemCount className="botonera"                            
                        max={nuevoMaxsegunTamanio(item)}
                        cantidad={cantidad}
                        setCantidad={setCantidad}
                        agregar={() => handleAgregar(item)}
                        />
                        {isInCartSegunTamanio(item.id)&& 
                        <p>You already have {enCartsegunTamanio(item)}{enCartsegunTamanio(item) > 1? " items" : " item"} in {tamanio} size of this product in cart</p>} 
                        </>
                }
            </div>        
    )
}

export default WishCard