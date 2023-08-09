import './guarantee.scss'
import guaranteeIlus from '../../assets/30days.svg'

export const Guarantee = () => {
    return (
      <section className='guarantee_banner'>                                     
                <h2 className="guarantee_text">30 Days Health Guarantee</h2> 
                <img className="guarantee_ilustration" src={guaranteeIlus} alt="30 days guarantee"/> 
      </section>
    )
  }