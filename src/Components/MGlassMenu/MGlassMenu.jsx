

import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io'
import './MGlassMenu.scss'
/* import MenuList from './MenuList' */
import { useState} from 'react'
import { SearchContext } from '../../context/SearchContext';
import { useContext } from "react"


const MGlassMenu = () => {
    const [showMGlass, setShowMGlass] = useState(false)

    const { busqueda, setBusqueda, handleClick } = useContext(SearchContext)

    const handleOpenMG = () => {
        setShowMGlass(true)
    }

    const handleCloseMG = () => {
        setShowMGlass(false)
    }

    const handleClickandClose = () => {
        handleClick()
        handleCloseMG()        
    }

    return (
        <div className={showMGlass ? "mg_menu-active mg_menu" : "mg_menu"}> 
            <div>
                <HiMagnifyingGlass onClick={handleOpenMG} className='magnifying-glass_icon_menu'/>
            </div>
    
            <div className='mg_menu__backdrop' onClick={handleCloseMG}>
                <div onClick={(e) => e.stopPropagation()}  className="mg_menulist">
                    <IoMdClose onClick={handleCloseMG} className='mg_menulist_close_icon cursor-pointer'/>
                    <div className='mg_row'>
                        <div className="mg_search items-left rounded-md border border-gray-300 ">                  
                            <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} type="text" className="w-full bg-transparent focus:outline-none px-2" placeholder="Search" id="buscar"/>
                        </div>
                        <HiMagnifyingGlass onClick={handleClickandClose} className="mg_menulist__link" to="/"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MGlassMenu