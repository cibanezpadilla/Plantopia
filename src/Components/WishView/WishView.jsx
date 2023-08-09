import { useContext } from "react"
import { WishContext } from "../../context/WishContext"
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { toCapital } from '../../helpers/toCapital.js'
/* import ItemCount from "../ItemCount/ItemCount"
import SelectTamanio from "../SelectTamanio/SelectTamanio" */
import './WishView.scss'
import WishCard from "../WishCard/WishCard.jsx"



const WishView = () => {
    

    const { wish, clearWish } = useContext(WishContext)



    if (wish.length === 0) {
        return (
            <div className="container my-5">
                <h2 className="text-4xl">Your wishlist is empty</h2>
                <hr/>
                <Link to="/" className="btn btn-success">Go Shopping!</Link>
            </div>
        )
    }


    return (
        <div className="">
            <h2 className="text-4xl">Your Wishlist</h2>
            <hr/>
            <div>
            {
                wish.map((prod) => <WishCard key={prod.id} item={prod}/>)
            }
            </div>
            
            <div>
                <hr />
                <button onClick={clearWish} className="btn btn-danger">Clear WishList</button>
                {/* <Link className="btn btn-success mx-2" to="/checkout">Finish my purchase</Link> */}
            </div>                        
        </div>
    )
}

export default WishView