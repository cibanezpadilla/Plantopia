
import './WishRemoveButton.scss'
import { AiFillHeart } from 'react-icons/ai'



const WishRemoveButton = ({handleRemoveFromWish}) => {
 
    return (
        <div className="wish-buttons">
            <button onClick={handleRemoveFromWish} ><AiFillHeart className="remove-from-wish"/></button>          
        </div>
    )
}

export default WishRemoveButton