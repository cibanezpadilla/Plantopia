import { useEffect, useState } from "react"
import { pedirDatos } from "../../helpers/pedirDatos"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import "./ItemDetailContainer.scss"
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../firebase/config'
import { ProductNotFound } from "../ProductNotFound/ProductNotFound"



const ItemDetailContainer = () => {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()

   

    useEffect(() => {
        setLoading(true)

        //1- armar la ref
        const itemRef = doc(db, "productos", itemId)
        
        //2- llamar la ref
        getDoc(itemRef)
            .then((doc) => {
                setItem({
                    id: doc.id,
                    ...doc.data()
                })
                
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, [])


    console.log(item)
    if (item) {
        if (item.descripcion == undefined) {
            return (
                <ProductNotFound/>
            )
        }
    }

    return (
        <div className="container detail_container">
            
            {
                loading
                    ? <h2>Loading...</h2>
                    : <ItemDetail item={item}/>
            }
        </div>
    )
}

export default ItemDetailContainer