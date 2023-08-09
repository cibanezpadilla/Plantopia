import { Link } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'

const MenuList = ( {close} ) => {


    return (
        <nav onClick={(e) => e.stopPropagation()}  className="menulist">
            <IoMdClose onClick={close} className='menulist_close_icon cursor-pointer'/>            
            <Link onClick={close} className="menulist__link" to="/">Home</Link>
            <Link onClick={close} className="menulist__link" to="/products/all">Shop</Link>
            <Link onClick={close} className="menulist__link" to="/about">About</Link>
            <Link onClick={close} className="menulist__link" to="/contact">Contact</Link>
        </nav>
    )
}

export default MenuList