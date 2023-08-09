
import { createContext, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/config'

export const SearchContext = createContext()


export const SearchProvider = ({children}) => {
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([])
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate('/products/all');
            setTimeout(buscar, 0);
            console.log("keydown")            
        }
      }


      const buscar = () => {
        const productosRef = collection(db, "productos")
        /* console.log(productosRef) */        
        let start = busqueda.toLocaleLowerCase();
        let end = (busqueda + "\uf8ff").toLowerCase(); // El carácter Unicode '\uf8ff' asegura que es mayor que cualquier carácter válido en Firebase

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
            /* .finally(() => setLoading(false))   */   
            console.log("buscar")
            console.log(busqueda)   
    }

    
    return (
        <SearchContext.Provider value={{
            busqueda,
            productos,
            setBusqueda,
            setProductos,
            /* navigate,
            useNavigate, */
            handleKeyDown,            
        }}>
            {children}
        </SearchContext.Provider>
    )
}