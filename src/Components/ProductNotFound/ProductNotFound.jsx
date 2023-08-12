
import './ProductNotFound.scss'
import deadCactus from '../../assets/cactusNofFound.jpg'
import { Link } from "react-router-dom"

export const ProductNotFound = () => {
    return (
      <section className='page-not-found'>
            <h2 className='page-not-found_title'>PRODUCT NOT FOUND</h2>
            <hr/>          
            <img className="page-not-found_cactus" src={deadCactus} alt="dead cactus"/>
            <hr/>
            <div className="page-not-found_footer">                 
              <Link to="/" className="cart_footer_button_finish">Back Home</Link>                              
            </div>                                                        
      </section>
    )
  }