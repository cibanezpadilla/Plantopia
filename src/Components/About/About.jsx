

import './About.scss'
import aboutImg from '../../assets/about.jpg'

export const About = () => {
    return (
      <section className='about'>
            <h2 className='about_title'>ABOUT</h2>
            <div className='about_grid'>
                <img className="about_img" src={aboutImg} alt="owner"/>
                    <div className="about_info">
                        <p className="">Hello, I’m Jane and I’m the founder of Plantopia. Since 2016, we’ve changed the way people think about buying plants.</p>            
                        <p className="">We were the first online plant shop and we’ve delivered over 2 million plants to 500,000 happy customers - there’s a reason the Good Housekeeping Institute recognises us as the Best Plant Delivery Service 2022.</p>
                        
                        <p className="">Our green-fingered Team lives and breathes greenery, meaning that when you shop with us you are getting the best quality houseplants in london and a level of care and expertise that is second to none.</p>
                        <p className="">Our plants, our passion!</p>
                                      
                    </div>   
            </div>                                 
      </section>
    )
  }