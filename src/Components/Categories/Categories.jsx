
import './Categories.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Categories = () => {
  const [indoor, setIndoor] = useState(false)
  const [outdoor, setOutdoor] = useState(false)
  const [cactiesSucculents, setCactiesSucculents] = useState(false)
  const [all, setAll] = useState(false)  
  const { categoryId } = useParams()

  
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



  return (
    <div className="categories">
        <Link className={all? "category_active" : ""} to="/products/all">All</Link>
        <p className='slash'>/</p>  
        <Link className={indoor? "category_active" : ""} to="/products/indoor">Indoor</Link>
        <p className='slash'>/</p>
        <Link className={outdoor? "category_active" : ""} to="/products/outdoor">Outdoor</Link>
        <p className='slash'>/</p>
        <Link className={cactiesSucculents? "category_active" : ""} to="/products/cactiesSucculents">Cacties and Succulents</Link>
    </div>    
  )
}
