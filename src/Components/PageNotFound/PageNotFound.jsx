

import './PageNotFound.scss'
/* import pageNotFound from '../../assets/notFound.png' */
import deadCactus from '../../assets/deadCactus.png'

export const PageNotFound = () => {
    return (
      <section className='page-not-found'>
            <h2 className='page-not-found_title1'>PAGE NOT</h2>
            <h2 className='page-not-found_title2'>FOUND</h2>             
            <img className="page-not-found_cactus" src={deadCactus} alt="dead cactus"/>                                                        
      </section>
    )
  }