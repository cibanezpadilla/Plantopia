/* import { BsFacebook } from 'react-icons/fa'; */
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import './Footer.scss'

export const Footer = () => {
    return (
        <footer>
            <div className="footer__up">
                <p>Find us!</p>
                <div className="footer__icons">            
                    <FaFacebook />
                    <FaInstagram/>
                    <FaTwitter/>
                    <FaWhatsapp/>
                </div>
            </div>
            
            
            <div className="divlunzi">
                <p>Copywrite Plantopia 2023</p>
                <p>Created by Clemencia Ibañez Padilla</p> 
            </div>               
        </footer>
    )
  }


