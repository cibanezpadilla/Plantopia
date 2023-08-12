import { createContext,  useEffect, useState } from "react";

export const WishContext = createContext()


const init = JSON.parse(localStorage.getItem('wish')) || []

export const WishProvider = ({children}) => {
    
    const [wish, setWish] = useState(init)
    
   

    const addToWish = (item, setOnWish) => {
      setWish([...wish, item])
      setOnWish(true)                        
    }

    const removeFromWish = (id, setOnWish) => {
      setWish(wish.filter((item) => item.id !== id) )
      setOnWish(false)              
    }

   
  
    
        
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
            addToWish,
            removeFromWish,            
            clearWish            
        }}>
            {children}
        </WishContext.Provider>
    )
}