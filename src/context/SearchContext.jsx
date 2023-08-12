
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
            setBusqueda('')                       
        }
      }

      const handleClick = () => {        
            navigate('/products/all');
            setTimeout(buscar, 0);
            setBusqueda('')        
      }


      const buscar = () => {
        const productosRef = collection(db, "productos")
               
        let start = busqueda.toLocaleLowerCase();
        let end = (busqueda + "\uf8ff").toLowerCase(); // El carácter Unicode '\uf8ff' asegura que es mayor que cualquier carácter válido en Firebase

        let qu = query(productosRef, where('nombre', '>=', start), where('nombre', '<', end));

        
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
               
    }

    
    return (
        <SearchContext.Provider value={{
            busqueda,
            productos,
            setBusqueda,
            setProductos,            
            handleKeyDown,
            handleClick,            
        }}>
            {children}
        </SearchContext.Provider>
    )
}