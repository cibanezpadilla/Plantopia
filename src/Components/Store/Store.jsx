import './Store.scss'
import storeImg from '../../assets/store.jpg'

export const Store = () => {
    return (
      <section className='physical_store'>
            <h2 className='find_us'>FIND US</h2>
            <div className='store_grid'>
                <img className="store_img" src={storeImg} alt="our store"/>
                    <div className="store_info">
                        <p className="">Our London plant shop is on the vibrant Exmouth Market – come and browse plants in-person or collect your online orders.</p>            
                        <p className="">18 EXMOUTH MARKET, LONDON EC1R 4QE</p>
                        <div className='schedules'>
                            <p className="">MONDAY–FRIDAY</p>
                            <p className="">11.30–6.30PM</p>
                        </div>
                        <div className='schedules'>
                            <p className="">SATURDAY</p>
                            <p className="">11-6.30PM</p>  
                        </div>
                                      
                    </div>   
            </div>                                 
      </section>
    )
  }