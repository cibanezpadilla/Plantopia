import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { toCapital } from '../../helpers/toCapital.js'
import { redondearSiNecesario } from '../../helpers/redondearSiNecesario.js'
import emptyCart from '../../assets/emptyCart.jpg'
import './CartView.scss'



const CartView = () => {
    const { cart, totalCompra, removerDelCarrito, alertClearCart } = useContext(CartContext)

    if (cart.length === 0) {
        return (
            <div className="cart_section">
                <h2 className="cart_title">MY CART</h2>
                <hr/>
                <div className="cart_empty_section">
                    <img className="cart_empty-cart_img" src={emptyCart} alt="empty cart"/>
                    <h3 className="cart_empty_title">Your cart is empty</h3>
                </div>
                
                <hr/>
                <div className="cart_footer">                
                    <div className="cart_footer_buttons">
                        <Link to="/" className="cart_footer_button_finish">Go Shopping!</Link>
                    </div>                
                </div>                
            </div>
        )
    }


    return (
        <div className="cart_section">
            <h2 className="cart_title">MY CART</h2>
            <hr/>
            <div>
                {cart.map((item) => (
                        <div className="cart_card" key={item.id + item.tamanioSeleccionado}>                            
                            <Link to={`/detail/${item.id}`}><img className="cart_img" src={item.img} alt={item.nombre}/></Link>
                            <h3 className="cart-card_title">{toCapital(item.nombre)}</h3>
                            <p>Size: {item.tamanioSeleccionado}</p>
                            <p>Price: ${redondearSiNecesario(item.precioFinal)}</p>
                            <p>Quantity: {item.cantidad}</p>
                            <p>Subtotal: ${redondearSiNecesario(item.precioFinal * item.cantidad)}</p>
                            <button onClick={() => removerDelCarrito(item.id, item.tamanioSeleccionado)} className="remove">Remove</button>                                                   
                        </div>
                    ))            
                }
            </div>
            <hr />
            <div className="cart_footer">
                <h4 className="cart_total">Total Cart: ${totalCompra()}</h4>
                <div className="cart_footer_buttons">
                    <button onClick={alertClearCart} className="clear">Clear Cart</button>
                    <Link className="cart_footer_button_finish" to="/checkout">Buy</Link>
                </div>                
            </div>               
        </div>
    )
}

export default CartView











/* const CartView = () => {
    const { cart, totalCompra, vaciarCarrito, removerDelCarrito } = useContext(CartContext)

    return (
        <div className="container my-5">
            <h2 className="text-4xl">Your Cart</h2>
            <hr/>

            {
                cart.map((item) => (
                    <div key={item.id}>
                        <h3>{item.nombre}</h3>
                        <img src={item.img} alt={item.nombre}/>
                        <p>Price: ${item.precio}</p>
                        <p>Subtotal: ${item.precio * item.cantidad}</p>
                        <p>Quantity: {item.cantidad}</p>
                        <button onClick={() => removerDelCarrito(item.id)} className="btn btn-danger"><FaTrashAlt/></button>
                        <hr/>
                    </div>
                ))
            }

            <div>
                <h4 className="text-3xl my-2">Total: ${totalCompra()}</h4>
                <button onClick={vaciarCarrito} className="btn btn-danger">Clear Cart</button>
            </div>
        </div>
    )
}

export default CartView */