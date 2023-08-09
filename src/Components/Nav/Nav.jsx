
import './Nav.scss'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <div className="nav">
        <ul className="nav__items">
            <Link className="nav__item" to="/">Home</Link>
            <Link className="nav__item" to="/products/all">Shop</Link>
            <Link className="nav__item" to="/about">About</Link>
            <Link className="nav__item" to="/contact">Contact</Link>                          
        </ul>        
    </div>    
  )
}


