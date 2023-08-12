import { createContext,  useEffect, useState } from "react";
import Swal from 'sweetalert2'

export const CartContext = createContext()


const init = JSON.parse(localStorage.getItem('cart')) || []

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState(init)

    
    const agregarAlCarrito = (item) => {
      setCart([...cart, item])           
    }


    /* verifico si un item ya está en el carrito o no segun id y tamaño */
    const isInCartSegunTamanio = (id, tamanio) => {
      return cart.some((item) => item.id === id && item.tamanioSeleccionado === tamanio)
    }


    /* obtengo la cantidad de un item en el carrito segun id y tamaño */
    const enCartsegunTamanio = (item, tamanio) => {
      const itemInd = cart.findIndex((itemCart) => itemCart.id === item.id && itemCart.tamanioSeleccionado === tamanio);
      if (itemInd !== -1) {
          return cart[itemInd].cantidad
      }
      else{
          return 0
      }
    }


    /* obtengo la cantidad máxima seleccionable actualizada, restando el stock menos la cantidad en carrito para ese id y tamaño */
    const nuevoMaxsegunTamanio = (item, tamanio, stock) => {
      const itemIndx = cart.findIndex((itemCart) => itemCart.id === item.id && itemCart.tamanioSeleccionado === tamanio);          
        if (itemIndx !== -1) {
          return (stock - cart[itemIndx].cantidad)
        }else {
          return (stock)
      }
  }


    const totalStock = (item) => {        
        let sumaStock = 0;
        for (const tamano of item.tamanios) {
            sumaStock += tamano.stock;
        }
        return sumaStock        
    }

    

    const removerDelCarrito = (id, tamano) => {
        setCart( cart.filter((item) => item.id !== id || item.tamanioSeleccionado !== tamano))
    } 
  
    
    const totalCompra = () => {
        return cart.reduce((acc, item) => acc + item.precioFinal * item.cantidad, 0)
    }

    const totalCantidad = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0)
    }


    /* funcion que dispara alerta antes de vaciar carrito */
    const alertClearCart = () => {
        Swal.fire({
            title: "Are you sure you want to empty the cart?",
            text: `You have ${totalCantidad()} ${
              totalCantidad() > 1 ? "items" : "item"
            } in your cart`,
            icon: "warning",
            iconColor: "#E2B2AE",
            showDenyButton: true,
            confirmButtonText: "Accept",
            confirmButtonColor: "#353b41",
            denyButtonText: `Cancel`,
            denyButtonColor: "#ce9b97",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                icon: "success",
                iconColor: "#E2B2AE",
                text: `Cart emptied. ${totalCantidad()} ${
                  totalCantidad() > 1 ? "items were " : "item was"
                } removed.`,
                confirmButtonText: "Accept",
                confirmButtonColor: "#000000",
              });
              vaciarCarrito();
            }
          });
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
            isInCartSegunTamanio,
            enCartsegunTamanio,
            nuevoMaxsegunTamanio,
            totalStock,            
            agregarAlCarrito,            
            totalCompra,
            alertClearCart,
            vaciarCarrito,
            totalCantidad,
            removerDelCarrito
        }}>
            {children}
        </CartContext.Provider>
    )
}