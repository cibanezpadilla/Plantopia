import { BsChevronDown } from 'react-icons/bs'
import './CategoriesMenu.scss'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CategoriesMenu = () => {
    const [indoor, setIndoor] = useState(false)
    const [outdoor, setOutdoor] = useState(false)
    const [cactiesSucculents, setCactiesSucculents] = useState(false)
    const [all, setAll] = useState(false)  
    const { categoryId } = useParams()
    const [showMenuCat, setShowMenuCat] = useState(false)
  
    
    useEffect(() => {
      if (categoryId == "indoor") {
        setIndoor(true)
        setOutdoor(false)
        setCactiesSucculents(false)
        setAll(false)
      }
    
      if (categoryId == "outdoor") {
        setOutdoor(true)
        setIndoor(false)      
        setCactiesSucculents(false)
        setAll(false)
      }
    
      if (categoryId == "cactiesSucculents") {
        setCactiesSucculents(true)      
        setIndoor(false)      
        setOutdoor(false)
        setAll(false)
      }
    
      if (categoryId == "all") {
        setAll(true)
        setIndoor(false)      
        setOutdoor(false)
        setCactiesSucculents(false)
      }
  }, [categoryId])
  
  
  
  
    useEffect(() => {
    if (categoryId == undefined) {
        setAll(true)
        setIndoor(false)      
        setOutdoor(false)
        setCactiesSucculents(false)
    }
    }, [!categoryId])
  
    

    const openClose = () => {
        setShowMenuCat(!showMenuCat)
    }

    
    return (
        <div className='div_cat_menu'> 
            <div onClick={openClose} className='cat_menu cursor-pointer'>
                <h4 className='cat_menu_title'> Categories <BsChevronDown/></h4>                
            </div>

            {showMenuCat && 
            <div className='category_list_block'>
                <Link className={all? "category_active block" : "block"} to="/products/all">All</Link>            
                <Link className={indoor? "category_active block" : "block"} to="/products/indoor">Indoor</Link>          
                <Link className={outdoor? "category_active block" : "block"} to="/products/outdoor">Outdoor</Link>           
                <Link className={cactiesSucculents? "category_active block" : "block"} to="/products/cactiesSucculents">Cacties and Succulents</Link>            
            </div>}            
        </div>
    )
}

export default CategoriesMenu