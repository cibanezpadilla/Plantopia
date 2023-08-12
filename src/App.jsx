import './index.css'
import './App.css'
import { Header } from "./Components/Header/Header"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer";
import { Footer } from "./Components/Footer/Footer"
import { PageNotFound } from './Components/PageNotFound/PageNotFound'
import { CartProvider } from "./context/CartContext";
import WishView from "./Components/WishView/WishView";
import CartView from "./Components/CartView/CartView";
import { SearchProvider } from './context/SearchContext'
import Checkout from "./Components/Checkout/Checkout";
import { WishProvider } from './context/WishContext'
import { ContactRoute } from './Components/ContactRoute/ContactRoute'
import { AboutRoute } from './Components/AboutRoute/AboutRoute'
import { HomeRoute } from './Components/HomeRoute/HomeRoute'
import { CategoryRoute } from './Components/CategoryRoute/CategoryRoute'




function App() {

  
  return (
    <div>        
          <CartProvider>
            <WishProvider>
              <BrowserRouter>
              
                <SearchProvider>
                  <Header />        
                  
                  <Routes>
                    <Route path="/" element={ <HomeRoute/> }/>
                    
                    <Route path="/products/:categoryId" element={ <CategoryRoute/> }/>
                    
                    <Route path="/detail/:itemId" element={ <ItemDetailContainer /> }/>                    
                    
                    <Route path="/wish" element={ <WishView /> }/>

                    <Route path="/cart" element={ <CartView /> }/>
                    
                    <Route path="/checkout" element={ <Checkout/> }/>
                  
                    <Route path="/contact" element={ <ContactRoute/> }/>                    

                    <Route path="/about" element={ <AboutRoute/> }/>

                    <Route path="/*" element={ <PageNotFound/> }/>          
                  </Routes>
                  <Footer/>  
                </SearchProvider>

              </BrowserRouter>
            </WishProvider>
          </CartProvider>        
    </div>
  )
}

export default App