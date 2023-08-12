import { useContext, useEffect, useState } from "react"
import { WishContext } from "../../context/WishContext"
import { CartContext } from "../../context/CartContext"
import { toCapital } from '../../helpers/toCapital.js'
import { redondearSiNecesario } from '../../helpers/redondearSiNecesario.js'
import { Link } from "react-router-dom"
import ItemCount from "../ItemCount/ItemCount"
import SelectTamanio from "../SelectTamanio/SelectTamanio" 
import './WishCard.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const WishCard = ({item}) => {

    const { wish, setWish} = useContext(WishContext)
    const { agregarAlCarrito, cart, setCart, isInCartSegunTamanio, enCartsegunTamanio, nuevoMaxsegunTamanio} = useContext(CartContext)
    

    
    const [cantidad, setCantidad] = useState(1)
    const [tamanio, setTamanio] = useState(null)
    const [multiplier, setMultiplier] = useState(1)
    const [precio, setPrecio] = useState(item.precio)
    const [stock, setStock] = useState(null)


   
    const handleAgregar = () => {
        const newItem = {
          ...item,
          cantidad,
          precioFinal: precio,
          tamanioSeleccionado: tamanio
        };      
        toast('Product added to cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

        const itemIndex = cart.findIndex((itemCart) => itemCart.id === newItem.id && itemCart.tamanioSeleccionado === newItem.tamanioSeleccionado);
                
        if (itemIndex !== -1) {
          // El elemento ya está en el carrito, actualizo su cantidad
          const updatedCarrito = [...cart];
          updatedCarrito[itemIndex].cantidad += cantidad;          
          setCart(updatedCarrito);
          setCantidad(1)          
        } else {
          // El elemento no está en el carrito, lo agrego
          agregarAlCarrito(newItem);
          setCantidad(1)          
        }
      };
        
               

    useEffect(() => {
        setPrecio(redondearSiNecesario( item.precio * multiplier))
        setCantidad(1)        
    },[multiplier])

    
  
    const removeFromWish = (id) => {
      setWish(wish.filter((item) => item.id !== id) )      
    } 

    
    
    return (
            <div className="wish_card" key={item.id}>
                <Link to={`/detail/${item.id}`}><img className="wish_img" src={item.img} alt={item.nombre}/></Link>                
                <h3 className="wish-card_title">{toCapital(item.nombre)}</h3>                                          
                <p className="wish-card_price">Price: ${precio}</p>
                <SelectTamanio className='select-wis' options={item.tamanios} setTamanio={setTamanio} setMultiplier={setMultiplier} setStock={setStock}/>                            
                {
                    nuevoMaxsegunTamanio(item, tamanio, stock) == 0
                        ? <div>
                            <p className="check-dif-text">Product out of stock, check different sizes!</p>
                            {enCartsegunTamanio(item, tamanio) != 0 && <p className="you-have-text">You already have {enCartsegunTamanio(item, tamanio)}{enCartsegunTamanio(item, tamanio) > 1? " items" : " item"} in {tamanio} size of this product in cart</p>}
                        </div>                        
                    
                        : <div className="buttons_section-wish">
                            <ItemCount className="botonera"                            
                            max={nuevoMaxsegunTamanio(item, tamanio, stock)}
                            cantidad={cantidad}
                            setCantidad={setCantidad}
                            agregar={handleAgregar}
                            />
                            {isInCartSegunTamanio(item.id, tamanio)&& 
                            <p className="you-have-text">You already have {enCartsegunTamanio(item, tamanio)}{enCartsegunTamanio(item, tamanio) > 1? " items" : " item"} in {tamanio} size of this product in cart</p>} 
                        </div>
                }
                <button onClick={() => removeFromWish(item.id)} className="remove">Remove</button> 
                <ToastContainer /> 
            </div>        
    )
}

export default WishCard