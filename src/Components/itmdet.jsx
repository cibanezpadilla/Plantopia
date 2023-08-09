import { useEffect, useState } from "react"
import { pedirDatos } from "../../helpers/pedirDatos"
import { useParams } from "react-router-dom"
import ItemDetail from "../ItemDetail/ItemDetail"
import "./ItemDetailContainer.scss"



const ItemDetailContainer = () => {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()

   

    useEffect(() => {
        setLoading(true)

        pedirDatos()
            .then(r => {
                setItem( r.find(prod => prod.id === Number(itemId)) )
            })
            .finally(() => setLoading(false))
    }, [])

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






/* const handleAgregarMas = (id) => {
    setCantidadMas(10)
    setCart((prevCart) => {
      // Filtrar el elemento existente del carrito por su id
      const updatedCart = prevCart.filter((item) => item.id !== id);

      // Obtener el objeto de item actual del carrito por su id
      const existingItem = prevCart.find((item) => item.id === id);
      
      
      // Verificar si el item existe en el carrito antes de actualizar la cantidad
      if (existingItem) {
        // Crear el objeto oldItem con la nueva cantidad
        const oldItem = {
          ...existingItem,
          cantidadMas,
        };

        // Agregar el elemento actualizado al carrito
        return [...updatedCart, oldItem];
      } else {
        // Si el item no existe en el carrito, simplemente retornar el carrito sin cambios
        return prevCart;
      }
    });
  }; */