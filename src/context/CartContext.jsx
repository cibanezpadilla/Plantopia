import { createContext,  useEffect, useState } from "react";

export const CartContext = createContext()


const init = JSON.parse(localStorage.getItem('cart')) || []

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(init)

    const [cantidad, setCantidad] = useState(1)
    const [tamanio, setTamanio] = useState(null)
    const [multiplier, setMultiplier] = useState(1)
    const [precio, setPrecio] = useState(null) /* aca le saco el item.precio */
    const [stock, setStock] = useState(null)
    

    const agregarAlCarrito = (item) => {
      setCart([...cart, item])           
    }

   


    const isInCartSegunTamanio = (id) => {
        return cart.some((item) => item.id === id && item.tamanioSeleccionado === tamanio)
      }

    const enCartsegunTamanio = (item) => {
        const itemInd = cart.findIndex((itemCart) => itemCart.id === item.id && itemCart.tamanioSeleccionado === tamanio);
        if (itemInd !== -1) {
            return cart[itemInd].cantidad
        }
        else{
            return 0
        }
    }

    const nuevoMaxsegunTamanio = (item) => {
        const itemIndx = cart.findIndex((itemCart) => itemCart.id === item.id && itemCart.tamanioSeleccionado === tamanio);          
          if (itemIndx !== -1) {
            return (stock - cart[itemIndx].cantidad)
          }else {
            return (stock)
        }
    }


    const totalStock = (item) => {
        const sizesInCart = cart.filter((itemCart) => itemCart.id === item.id);
        const totStock= sizesInCart.reduce((acc, item) => acc + item.cantidad, 0)
        let sumaStock = 0;
        for (const tamano of item.tamanios) {
            sumaStock += tamano.stock;
        }
        return (sumaStock - totStock)        
    }

    

    const removerDelCarrito = (id, tamano) => {
        setCart( cart.filter((item) => item.id !== id || item.tamanioSeleccionado !== tamano))
    } 
  
    const isInCart = (id) => {
      return cart.some((item) => item.id === id)
    }

    const totalCompra = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    }

    const totalCantidad = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0)
    }

    const vaciarCarrito = () => {
        setCart([])
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    
    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            totalStock,            
            cantidad, 
            setCantidad,
            tamanio, 
            setTamanio,
            multiplier, 
            setMultiplier,
            precio, 
            setPrecio,
            stock, 
            setStock,
            agregarAlCarrito,
            isInCartSegunTamanio,
            enCartsegunTamanio,
            nuevoMaxsegunTamanio,
            isInCart,
            totalCompra,
            vaciarCarrito,
            totalCantidad,
            removerDelCarrito
        }}>
            {children}
        </CartContext.Provider>
    )
}




/* ****************************************************************** */


/* PUEDO ESCRIBIR ESTA FUNCION PARA NO REPETIR CODIGO
    const itemIndx = (item) => {
        return cart.findIndex((itemCart) => itemCart.id === item.id);
      } */



     /* a enCart no necesito pasarle el parametro item si lo dejo en ItemDetail
    pero sí necesito pasarselo si lo guardo en CartContext*/

   /*  const enCart = (item) => {
        const itemInd = cart.findIndex((itemCart) => itemCart.id === item.id);
        if (itemInd !== -1) {
            return cart[itemInd].cantidad
        }
    } */



    /* a nuevoMax no necesito pasarle el parametro item si lo dejo en ItemDetail, pero sí necesito pasarselo si lo guardo en CartContext */

    /* const nuevoMax = (item) => {
        const itemIndx = cart.findIndex((itemCart) => itemCart.id === item.id);          
          if (itemIndx !== -1) {
            return (item.stock - cart[itemIndx].cantidad)
          }else {
            return (item.stock)
        }
    } */


    /* ESTA ES LA VERSION DE NUEVO MAX USANDO  LA FUNCION ITEMINDX PARA NO REPETIR UNA LINEA DE CODIGO
    const nuevoMax = (item) => {        
        itemIndx(item)     
          if (itemIndx(item) !== -1) {
            return (item.stock - cart[itemIndx(item)].cantidad)
          }else {
            return (item.stock)
        }
    } */