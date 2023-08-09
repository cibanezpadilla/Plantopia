
/* import './WishAddButton.scss' */
import { AiOutlineHeart } from 'react-icons/ai'


const WishAddButton = ({handleAddToWish}) => {


    return (
        <div className="wish-buttons">
            <button onClick={handleAddToWish} className="add-to-wish"><AiOutlineHeart/></button>           
        </div>
    )
}

export default WishAddButton