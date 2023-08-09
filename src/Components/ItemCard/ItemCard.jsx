import './ItemCard.scss'
import { Link } from "react-router-dom"
import { toCapital } from '../../helpers/toCapital.js'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { WishContext } from "../../context/WishContext"
import WishRemoveButton from "../WishRemoveButton/WishRemoveButton"
import WishAddButton from "../WishAddButton/WishAddButton"



const ItemCard = ({item}) => {

    const {totalStock } = useContext(CartContext)

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

    return (
        <div className='tarjetita'>
            <div className='contenedor-img-out'>
                <img className="imgProd" src={item.img} alt={item.nombre}/>
                {totalStock(item) == 0 && 
                    <>
                        <div className='out-of-stock_bg'>
                            <p className="out-of-stock_title">PRODUCT OUT OF STOCK</p>
                        </div>
                    </>}
            </div>            
            <h4>{toCapital(item.nombre)}</h4>
            {onWish
                    ? <WishRemoveButton handleRemoveFromWish={() => removeFromWish(item.id)}/>
                    : <WishAddButton handleAddToWish ={addToWish}/>
            }                    
            <p className='mb-6'>Price: ${item.precio}</p>
            {/* <button className='more_details btn btn-primary'>+ details</button> */}
            <Link to={`/detail/${item.id}`} className='more_details'>+ details</Link>            
        </div>
    )
}

export default ItemCard