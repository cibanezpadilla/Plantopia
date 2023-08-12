
import { Carrousel } from "../Carrousel/Carrousel"
import { Categories } from "../Categories/Categories"
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu"
import { Delivery } from "../Delivery/Delivery"
import { Guarantee } from "../Guarantee/Guarantee"
import ItemListContainer from "../ItemListContainer/ItemListContainer"





export const HomeRoute = () => {
    return (
        <div>
            <Carrousel/>
            <CategoriesMenu/>
            <Categories/>
            <ItemListContainer/>
            <Delivery/>
            <Guarantee/>
        </div>
    )
}