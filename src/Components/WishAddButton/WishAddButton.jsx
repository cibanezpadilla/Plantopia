
import './WishAddButton.scss'
import { AiOutlineHeart } from 'react-icons/ai'


const WishAddButton = ({handleAddToWish}) => {

    return (
        <div className="wish-buttons">
            <button onClick={handleAddToWish} ><AiOutlineHeart className="add-to-wish"/></button>           
        </div>
    )
}


export default WishAddButton