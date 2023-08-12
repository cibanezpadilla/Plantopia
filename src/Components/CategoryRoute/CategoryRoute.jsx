

import { Categories } from "../Categories/Categories"
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu"
import { Delivery } from "../Delivery/Delivery"
import { Guarantee } from "../Guarantee/Guarantee"
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import PortadaCat from "../PortadaCat/PortadaCat"





export const CategoryRoute = () => {
    return (
        <div>
            <PortadaCat/>
            <CategoriesMenu/>
            <Categories/>
            <ItemListContainer/>
            <Delivery/>
            <Guarantee/>
        </div>
    )
}