 

const ItemCount = ({max, cantidad, setCantidad, agregar}) => {
    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }

    return (
        <div className="item_count">
            <button onClick={handleRestar} className="add">-</button>
            <span className="mx-2">{cantidad}</span>
            <button onClick={handleSumar} className="add">+</button>
            <br/>
            <button onClick={agregar} className="addToCart">Add to Cart</button>

        </div>
    )
}

export default ItemCount