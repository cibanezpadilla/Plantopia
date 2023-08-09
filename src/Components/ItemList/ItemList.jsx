
import ItemCard from "../ItemCard/ItemCard"
import "./ItemList.scss"




const ItemList = ({productos}) => {    

    return (
        <div className="contenedor">           
            <div className='grid'>
            {
                productos.map((prod) => <ItemCard key={prod.id} item={prod}/>)
            }
            </div>
        </div>
    )
}

export default ItemList