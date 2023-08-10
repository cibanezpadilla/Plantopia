
import './index.css'
import './App.css'
import { Carrousel } from './Components/Carrousel/Carrousel'
import { Header } from "./Components/Header/Header"
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer";
import PortadaCat from './Components/PortadaCat/PortadaCat'
import { Categories } from './Components/Categories/Categories'
import { Footer } from "./Components/Footer/Footer"
import { Contact } from "./Components/Contact/Contact"
import { Store } from './Components/Store/Store'
import { About } from './Components/About/About'
import { Delivery } from './Components/Delivery/Delivery'
import { Guarantee } from './Components/Guarantee/Guarantee'
import { Why } from './Components/WhyPlantopia/WhyPlantopia'
import { PageNotFound } from './Components/PageNotFound/PageNotFound'
import CategoriesMenu from './Components/CategoriesMenu/CategoriesMenu'
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import WishView from "./Components/WishView/WishView";
import CartView from "./Components/CartView/CartView";
import { SearchProvider } from './context/SearchContext'
import Checkout from "./Components/Checkout/Checkout";
/* import { ProductNotFound } from './Components/ProductNotFound/ProductNotFound' */
import { WishProvider } from './context/WishContext'
/* import { AuthContextProvider } from "./context/AuthContext" */
import LoginScreen from "./Components/Auth/LoginScreen"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import RegisterScreen from "./Components/Auth/RegisterScreen"

function App() {

  const { user } = useContext(AuthContext)
  
  console.log('user.logged',user.logged);

  return (
    <div>

        <DarkModeProvider>
          <CartProvider>
            <WishProvider>
              <BrowserRouter>
              {
              user.logged
              ? <>
                <SearchProvider>
                  <Header />        
                  
                  <Routes>
                    <Route path="/" element={ 
                        <div>
                          <Carrousel/>
                          <CategoriesMenu/>
                          <Categories/>
                          <ItemListContainer />
                          <Delivery/>
                          <Guarantee/>
                        </div> }/>
                    
                    <Route path="/products/:categoryId" element={
                        <div>
                          <PortadaCat/>
                          <CategoriesMenu/>
                          <Categories/>
                          <ItemListContainer />
                          <Delivery/>
                          <Guarantee/>              
                        </div>}/>

                    
                    <Route path="/detail/:itemId" element={ <ItemDetailContainer /> }/>

                    <Route path="/wish" element={ <WishView /> }/>

                    <Route path="/cart" element={ <CartView /> }/>
                    
                    <Route path="/checkout" element={ <Checkout/> }/>
                    

                  
                    <Route path="/contact" element={ 
                        <div>
                          <Store/>
                          <Contact />                                
                        </div>
                    }/>
                    <Route path="/about" element={ 
                        <div>
                          <About/>
                          <Why/>
                          
                        </div>
                    }/>
                    <Route path="/login" element={<Navigate to="/"/>}/>
                    <Route path="/*" element={ <PageNotFound/> }/>
                  </Routes>
                  <Footer/>  
                </SearchProvider>
                </>

              : <Routes>
                  <Route path="/login" element={<LoginScreen />}/>
                  <Route path="/register" element={<RegisterScreen />}/>
                  <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            }    
              </BrowserRouter>
            </WishProvider>
          </CartProvider>
        </DarkModeProvider>



            

    </div>
  )
}

export default App

   
            