import { useContext } from "react"
import { WishContext } from "../../context/WishContext"
import { Link } from "react-router-dom"
import './WishView.scss'
import empty from '../../assets/empty.jpg'
import WishCard from "../WishCard/WishCard.jsx"



const WishView = () => {
    

    const { wish, clearWish } = useContext(WishContext)



    if (wish.length === 0) {
        return (
            <div className="wish_section">
                <h2 className="cart_title">MY WISHLIST</h2>
                <hr/>
                <div className="wish_empty_section">
                    <img className="wish_empty_img" src={empty} alt="empty cart"/>
                    <h3 className="wish_empty_title">Your wishlist is empty</h3>
                </div>
                
                <hr/>
                <div className="wish_footer">                
                    <div className="cart_footer_buttons">
                        <Link to="/" className="cart_footer_button_finish">Go Shopping!</Link>
                    </div>                
                </div>       
                
            </div>
        )
    }


    return (
        <div className="wish_section">
            <h2 className="wish_title">MY WISHLIST</h2>
            <hr/>
            <div className="wish_container">
            {
                wish.map((prod) => <WishCard key={prod.id} item={prod}/>)
            }
            </div>
            <hr className="cart-wish-line"/>
            <div className="wish_footer">                
                <button onClick={clearWish} className="clear">Clear WishList</button>                
            </div>                        
        </div>
    )
}

export default WishView