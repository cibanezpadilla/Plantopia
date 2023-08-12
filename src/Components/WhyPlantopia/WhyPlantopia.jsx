

import './WhyPlantopia.scss'
import why1 from '../../assets/why1.svg'
import why2 from '../../assets/why2.svg'
import why3 from '../../assets/why3.svg'

export const Why = () => {
    return (
        <section>
            <h2 className='why_section_title'>WHY PLANTOPIA</h2>
            <div className='why_section'>
                <div className='why_column'>
                    <img className="why_ilustration" src={why1} alt="leaf"/>
                    <div className='why_row'>
                        <h2 className="why_title">HEALTHY PLANTS</h2> 
                        <p className='why_text'>We’re committed to supplying London’s best houseplants, handpicked by our growers in The Netherlands. In fact, it’s so important to us that we visit our nurseries in person regularly to ensure that we’re happy with the quality and range we’re offering.</p>
                    </div>
                    
                </div> 
                <div className='why_column'>
                    <img className="why_ilustration2" src={why2} alt="leaf"/>
                    <h2 className="why_title">FAIR PRICES</h2> 
                    <p className='why_text'>Some shops charge extortionate prices for plants – we want to change that. We believe that nature should be for everyone, meaning that we’re committed to making plants affordable.</p>
                </div>
                <div className='why_column'>
                    <img className="why_ilustration" src={why3} alt="leaf"/>
                    <h2 className="why_title">EXPERT ADVICE</h2> 
                    <p className='why_text'>When you buy a plant from us, we want to give you all the tools you need to look after it (literally and metaphorically!) If you’ve got a plant care question, drop us a line or visit us and we’d be happy to help.</p>
                </div>                
            </div>
      </section>
    )
  }
