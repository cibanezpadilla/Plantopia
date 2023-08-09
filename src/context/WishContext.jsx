import { createContext,  useEffect, useState } from "react";

export const WishContext = createContext()


const init = JSON.parse(localStorage.getItem('wish')) || []

export const WishProvider = ({children}) => {
    
    const [wish, setWish] = useState(init)
    
    /* const [onWish, setOnWish] = useState(false) */



    


    const addToWish = (item) => {
      setWish([...wish, item])
      setOnWish(true)           
    }


    /* const addToWish = (item) => {
        setWish([...wish, item])           
      } */

  

     /* a enwish no necesito pasarle el parametro item si lo dejo en ItemDetail
    pero sí necesito pasarselo si lo guardo en wishContext*/
    const enwish = (item) => {
        const itemInd = wish.findIndex((itemwish) => itemwish.id === item.id);
        if (itemInd !== -1) {
            return wish[itemInd].cantidad
        }
    }

    /* a nuevoMax no necesito pasarle el parametro item si lo dejo en ItemDetail, pero sí necesito pasarselo si lo guardo en wishContext */
    const nuevoMax = (item) => {
        const itemIndx = wish.findIndex((itemwish) => itemwish.id === item.id);          
          if (itemIndx !== -1) {
            return (item.stock - wish[itemIndx].cantidad)
          }else {
            return (item.stock)
        }
    }


   
    const removeFromWish = (id) => {
        setWish(wish.filter((item) => item.id !== id) )
        setOnWish(false)
    } 
  
    
    const isInWish = (id) => {
      const result = wish.some((item) => item.id === id)
      if (result){
        setOnWish(true)
      }
      else {
        setOnWish(false)
      }
    }

    /* const isInWish = (id) => {
        return wish.some((item) => item.id === id)
      } */

        
    const clearWish = () => {
        setWish([])
    }

    useEffect(() => {
        localStorage.setItem('wish', JSON.stringify(wish))
    }, [wish])

    return (
        <WishContext.Provider value={{
            wish,
            setWish,
            /* onWish,
            setOnWish, */            
            addToWish,
            enwish,
            nuevoMax,
            isInWish,
            clearWish,            
            removeFromWish
        }}>
            {children}
        </WishContext.Provider>
    )
}