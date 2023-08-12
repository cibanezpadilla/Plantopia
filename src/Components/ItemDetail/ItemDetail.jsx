import "./ItemDetail.scss"
import { useContext, useEffect, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { WishContext } from "../../context/WishContext"
import { toCapital } from '../../helpers/toCapital.js'
import { redondearSiNecesario } from '../../helpers/redondearSiNecesario.js'
import { parseText } from '../../helpers/parseText.jsx'
import SelectTamanio from "../SelectTamanio/SelectTamanio"
import WishRemoveButton from "../WishRemoveButton/WishRemoveButton"
import WishAddButton from "../WishAddButton/WishAddButton"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ItemDetail = ({item}) => {

    const { wish, addToWish, removeFromWish } = useContext(WishContext)
    const { agregarAlCarrito, cart, setCart, isInCartSegunTamanio, enCartsegunTamanio, nuevoMaxsegunTamanio} = useContext(CartContext)


    const [onWish, setOnWish] = useState(false)


    const [cantidad, setCantidad] = useState(1)
    const [tamanio, setTamanio] = useState(null)
    const [multiplier, setMultiplier] = useState(1)
    const [precio, setPrecio] = useState(item.precio) 
    const [stock, setStock] = useState(null)
  
    


    useEffect(() => {
        const result = wish.some((itemW) => itemW.id === item.id)
        if (result){
            setOnWish(true)
        }
        else {
            setOnWish(false)
        }
    },[])


      


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


    
    
    
    return (
        <div className="detail_card">
            <img className="imgDetail" src={item.img} alt={item.nombre}/>
            <div>
                <div className="heart_container">
                    {onWish
                        ? <WishRemoveButton className='heart' handleRemoveFromWish={() => removeFromWish(item.id, setOnWish)}/>
                        : <WishAddButton className='heart' handleAddToWish ={()=>addToWish(item, setOnWish)}/>
                    }
                </div>
                
                <div className="detail_info">                           
                    <h2 className="detail_titulo">{toCapital(item.nombre)}</h2>                               
                    {item && parseText(item.descripcion)}
                    <p className="detail_price">Price: ${precio}</p>                
                    <div className="buttons_section">
                        <SelectTamanio className='select-det' options={item.tamanios} setTamanio={setTamanio} setMultiplier={setMultiplier} setStock={setStock}/>                        
                        {
                            nuevoMaxsegunTamanio(item, tamanio, stock) == 0
                                ? <div>
                                    <p className="check-dif-text">Product out of stock, check different sizes!</p>
                                    {enCartsegunTamanio(item, tamanio) != 0 && <p className="you-have-text">You already have {enCartsegunTamanio(item, tamanio)}{enCartsegunTamanio(item, tamanio) > 1? " items" : " item"} in {tamanio} size of this product in cart</p>}
                                </div>

                                : <>
                                    <ItemCount className="botonera"                            
                                    max={nuevoMaxsegunTamanio(item, tamanio, stock)}
                                    cantidad={cantidad}
                                    setCantidad={setCantidad}
                                    agregar={handleAgregar}
                                    />
                                    {isInCartSegunTamanio(item.id, tamanio)&& 
                                    <p className="you-have-text">You already have {enCartsegunTamanio(item, tamanio)}{enCartsegunTamanio(item, tamanio) > 1? " items" : " item"} of this product in {tamanio} size in cart</p>} 
                                </>
                        }
                    </div>
                    <ToastContainer />
                </div>
            </div>                       
        </div>
    )
}

export default ItemDetail


