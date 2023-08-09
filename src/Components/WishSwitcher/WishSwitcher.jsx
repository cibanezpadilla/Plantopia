
import { useContext } from "react"
import { WishContext } from "../../context/WishContext"
import './WishSwitcher.scss'
import { AiFillHeart } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'


const WishSwitcher = ({handleAddToWish, handleRemoveFromWish}) => {

    const { isInWish } = useContext(WishContext)

    

    return (
        <div className="wish-switcher">
            {isInWish
                ? <button onClick={handleRemoveFromWish} className="remove-from-wish"><AiFillHeart/></button>
                : <button onClick={handleAddToWish} className="add-to-wish"><AiOutlineHeart/></button>
            }
        </div>
    )
}

export default WishSwitcher