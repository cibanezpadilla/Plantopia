
import user from '../../assets/user.png'
import { CartWidget } from '../CartWidget/CartWidget'
import { Nav } from '../Nav/Nav'
import './Header.scss'
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { AiOutlineHeart } from 'react-icons/ai'
import Menu from '../Menu/Menu';
import { Link } from 'react-router-dom'
import MGlassMenu from '../MGlassMenu/MGlassMenu';
import { SearchContext } from '../../context/SearchContext';
import { useContext } from "react"

import { AuthContext } from '../../context/AuthContext'


export const Header = () => {
  const { busqueda, setBusqueda, handleKeyDown } = useContext(SearchContext)
  const { user, logout } = useContext(AuthContext)

  return (
    <header className='header' >
        <Menu/>        
        <Link className="nav__item" to="/"><h1 className='logo '>PLANTOPIA</h1></Link>
                   
        <div className='icons_container'>
          <Nav />
          <MGlassMenu/>
          <div className='magnifying-glass'>
              <HiMagnifyingGlass className='magnifying-glass_icon'/>              
              <div className="search items-left rounded-md border border-gray-300 ">                  
                  <input onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={handleKeyDown} type="text" className="w-full bg-transparent focus:outline-none px-2" placeholder="Search" id="buscar"/>
              </div>
          </div>          
          <Link className="" to="/wish"><AiOutlineHeart/></Link>          
          <Link className="buttonss" to="/cart"><CartWidget/></Link>
          <p>Bienvenido: {user.email}</p>
          <button className='btn btn-danger' onClick={logout}>Logout</button>
        </div>                   
    </header>
  )
}



