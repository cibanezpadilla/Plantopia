import { useEffect, useState, useRef } from 'react'
import './ItemListContainer.scss'
/* import { pedirDatos } from '../../helpers/pedirDatos' */
import ItemList from '../ItemList/ItemList.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useContext } from "react"
import { SearchContext } from '../../context/SearchContext';


const ItemListContainer = () => {
    
    const { productos, setProductos } = useContext(SearchContext)
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()



    const ref = useRef();

    useEffect(() => {
        setLoading(true)

        
        const productosRef = collection(db, "productos")
        

        let q = productosRef

        if (categoryId == "all"){            
            q= productosRef
        }
        else if (categoryId){
            q= query(productosRef, where('category', "==", categoryId) )
        }
       else {
            q= productosRef
        }      
               

        
       
        getDocs(q)
            .then((resp) => {
                const docs = resp.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })
                
                setProductos(docs)
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))

    }, [categoryId])




    return (
        <div ref={ref} className='store'>            
            {
                loading
                    ? <h2>Loading...</h2>
                    : <ItemList  productos={productos}/>
            }
        </div>
    )
}


export default ItemListContainer




