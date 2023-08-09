
/* import './WishRemoveButton.scss' */
import { AiFillHeart } from 'react-icons/ai'



const WishRemoveButton = ({handleRemoveFromWish}) => {

    

    return (
        <div className="wish-buttons">
            <button onClick={handleRemoveFromWish} className="remove-from-wish"><AiFillHeart/></button>          
        </div>
    )
}

export default WishRemoveButton