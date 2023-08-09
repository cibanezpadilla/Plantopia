import './Contact.scss'
import { FaPhone } from 'react-icons/fa';
import { BsEnvelopeFill } from 'react-icons/bs';




export const Contact = () => {
    return (
        <section className="contacto" id="contacto">
            
            <h2 className="titulo_section">CONTACT US</h2>   
            
            <div className="contacto__section">
                <div className="divderecho">
                    <div className="contact__information">
                        <FaPhone className='icon'/>
                        <div>
                            <h3 className="contact__title">Calls</h3>
                            <span className="contact__subtitle">+44 (0)7935 711 062</span>
                        </div>
                    </div>
                    <div className="contact__information">
                        <BsEnvelopeFill className='icon'/>
                        <div>
                            <h3 className="contact__title">Email</h3>
                            <span className="contact__subtitle">help@plantopia.com</span>
                        </div>
                    </div>                    
                </div>            
                <form className="contact-form" action="">
                    <div className="contact__inputs">
                        <div className="contact__content">
                            <label htmlFor="nombre" className="contact__label">Name</label>
                            <input type="text" name="nombre" className="contact__input" id="nombre" required/>
                        </div>    
                        <div className="contact__content">
                            <label htmlFor="apellido" className="contact__label">Phone</label>
                            <input type="text" name="apellido" className="contact__input" id="apellido" required/>
                        </div>
                    </div>
                    
                    <div className="contact__content">
                        <label htmlFor="email" className="contact__label">Email</label>
                            <input type="email" name="email" className="contact__input" id="email" required/>
                    </div>
                    <div className="contact__content">
                        <label htmlFor="mensaje" className="contact__label">Message</label>
                        <textarea name="mensaje" id="" cols="0" rows="7" className="contact__input" required=""></textarea>
                    </div>
                    <div>
                        <button type="submit" className="button button--flex button--send">
                            Send                        
                        </button>
                    </div>
                </form>
            </div>            
        </section>
    )
}



