import './Delivery.scss'
import deliveryIlus from '../../assets/delivery.svg'

export const Delivery = () => {
    return (
      <section className='delivery_banner'>                     
                <img className="delivery_ilustration" src={deliveryIlus} alt="delivery girl"/>                    
                <h2 className="delivery_text">FREE STANDARD DELIVERY ON ORDERS OVER $50</h2> 
      </section>
    )
  }