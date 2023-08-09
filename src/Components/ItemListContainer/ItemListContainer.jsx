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
    /* const [productos, setProductos] = useState([]) */
    const { busqueda, setBusqueda, handleKeyDown, productos, setProductos } = useContext(SearchContext)
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()



    const ref = useRef();

    useEffect(() => {
        setLoading(true)

        // 1.- armar la referencia (sync)
        const productosRef = collection(db, "productos")
        /* const q = categoryId
                    ? query(productosRef, where('category', "==", categoryId) )
                    : productosRef */

        let q = productosRef

        if (categoryId == "all"){
            console.log("all probando")
            q= productosRef
        }
        else if (categoryId){
            q= query(productosRef, where('category', "==", categoryId) )
        }
       else {
            q= productosRef
        }      
               



        
        // 2.- llamar a esa ref (async)
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


/* *********************************************************************************
FUNCION BARRA DE BUSQUEDA */

    /* const [busqueda, setBusqueda] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/products/all');
            setTimeout(buscar(), 0);            
        }
      } */


    
/* ESTO LO TENGO EN SEARCH CONTEXT, DE ACA LO TENGO QUE BORRAR */
    const buscar = () => {
        const productosRef = collection(db, "productos")
        /* console.log(productosRef) */        
        let start = busqueda;
        let end = busqueda + "\uf8ff"; // El carácter Unicode '\uf8ff' asegura que es mayor que cualquier carácter válido en Firebase
        let qu = query(productosRef, where('nombre', '>=', start), where('nombre', '<', end));

        /* let qu= query(productosRef, where('nombre', 'in', busqueda) ) */
        getDocs(qu)
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
    }


    return (
        <div ref={ref} className='store'>
            {/* <div className="search items-left rounded-md border border-gray-300 ">                  
                      <input onChange={(e) => setBusqueda(e.target.value)}
        onKeyDown={handleKeyDown} type="text" className="w-full bg-transparent focus:outline-none px-2" placeholder="Search" id="buscar"/>
            </div> */}
            {
                loading
                    ? <h2>Loading...</h2>
                    : <ItemList  productos={productos}/>
            }
        </div>
    )
}

export default ItemListContainer




