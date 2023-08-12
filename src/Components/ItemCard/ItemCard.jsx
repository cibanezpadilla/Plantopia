import './ItemCard.scss'
import { Link } from "react-router-dom"
import { toCapital } from '../../helpers/toCapital.js'
import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { WishContext } from "../../context/WishContext"
import WishRemoveButton from "../WishRemoveButton/WishRemoveButton"
import WishAddButton from "../WishAddButton/WishAddButton"



const ItemCard = ({item}) => {

    const { wish, addToWish, removeFromWish} = useContext(WishContext)
    const {totalStock } = useContext(CartContext)

       
    
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
    
      

     

    return (
        <div className='tarjetita'>
            <div className='contenedor-img-out'>
                <Link to={`/detail/${item.id}`}><img className="imgProd" src={item.img} alt={item.nombre}/></Link>                
                {totalStock(item) == 0 && 
                    <>
                        <div className='out-of-stock_bg'>
                            <p className="out-of-stock_title">PRODUCT OUT OF STOCK</p>
                        </div>
                    </>}
            </div>
            <div className='card_title-fav'>
                <h4>{toCapital(item.nombre)}</h4>
                {onWish
                        ? <WishRemoveButton handleRemoveFromWish={() => removeFromWish(item.id, setOnWish)}/>
                        : <WishAddButton handleAddToWish ={() =>addToWish(item, setOnWish)}/>
                }  
            </div>                              
            <p className='card_price'>${item.precio}</p>
            <hr className='card_line'/>            
            <Link to={`/detail/${item.id}`} className='more_details'>View more</Link>            
        </div>
    )
}

export default ItemCard