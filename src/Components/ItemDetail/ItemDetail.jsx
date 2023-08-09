import "./ItemDetail.scss"
import { useContext, useEffect, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { WishContext } from "../../context/WishContext"
/* import { Link } from "react-router-dom" */
import { toCapital } from '../../helpers/toCapital.js'
import { parseText } from '../../helpers/parseText.jsx'
import SelectTamanio from "../SelectTamanio/SelectTamanio"
import WishRemoveButton from "../WishRemoveButton/WishRemoveButton"
import WishAddButton from "../WishAddButton/WishAddButton"




const ItemDetail = ({item}) => {

    const { agregarAlCarrito, cantidad, 
        setCantidad,
        tamanio, 
        setTamanio,
        multiplier, 
        setMultiplier,
        precio, 
        setPrecio,
        stock, 
        setStock, nuevoMaxsegunTamanio, isInCartSegunTamanio, enCartsegunTamanio, setCart, cart } = useContext(CartContext)

        const { wish, setWish, } = useContext(WishContext)

        const [onWish, setOnWish] = useState(false)


        useEffect(() => {
            const result = wish.some((itemW) => itemW.id === item.id)
            if (result){
                setOnWish(true)
            }
            else {
                setOnWish(false)
            }
        },[])


        const addToWish = () => {
            setWish([...wish, item])
            setOnWish(true)
            console.log(wish.map((item)=> item.id))                 
          }
    
          const removeFromWish = (id) => {
            setWish(wish.filter((item) => item.id !== id) )
            setOnWish(false)
            console.log(wish.map((item)=> item.id))         
        } 
        
        console.log(wish.map((item)=> item.id))

        


    /* const [cantidad, setCantidad] = useState(1)
    const [tamanio, setTamanio] = useState(null)
    const [multiplier, setMultiplier] = useState(1)
    const [precio, setPrecio] = useState(item.precio)
    const [stock, setStock] = useState(null) */

    
   
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
        <div className="detail_card">
            <img className="imgDetail" src={item.img} alt={item.nombre}/>
            <div className="detail_info">
                {onWish
                        ? <WishRemoveButton handleRemoveFromWish={() => removeFromWish(item.id)}/>
                        : <WishAddButton handleAddToWish ={addToWish}/>
                }           
                <h2 className="detail_titulo">{toCapital(item.nombre)}</h2>                               
                {item && parseText(item.descripcion)}
                <p className="detail_price">Price: ${precio}</p>                
                <div className="buttons_section">
                <SelectTamanio options={item.tamanios} setTamanio={setTamanio} setMultiplier={setMultiplier} setStock={setStock}/>
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
                            agregar={handleAgregar}
                            />
                            {isInCartSegunTamanio(item.id)&& 
                            <p>You already have {enCartsegunTamanio(item)}{enCartsegunTamanio(item) > 1? " items" : " item"} in {tamanio} size of this product in cart</p>} 
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