
import './CartWidget.scss'
import cart from '../../assets/cartBlack.png'
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"




export const CartWidget = () => {

  const { totalCantidad } = useContext(CartContext)

    return ( 
          <div className='cart-cont'>
            <div className="cart">              
              <button className='cart_button'><img src={cart} className="cart_icon" alt="cart icon" /></button>              
              <div className='cart_counter_fondo'>
                  <p className='cart_counter'>{totalCantidad()}</p>  
              </div>            
            </div>  
          </div>   
            
    )
  }



