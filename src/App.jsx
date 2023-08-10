
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import { CartProvider } from "./context/CartContext";
import { WishProvider } from "./context/WishContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Header } from "./Components/Header/Header";
import { Carrousel } from "./Components/Carrousel/Carrousel";
import { CategoriesMenu } from "./Components/CategoriesMenu/CategoriesMenu";
import { Categories } from "./Components/Categories/Categories";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer";
import PortadaCat from "./Components/PortadaCat/PortadaCat";
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer";
import Delivery from "./Components/Delivery/Delivery";
import Guarantee from "./Components/Guarantee/Guarantee";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import Store from "./Components/Store/Store";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import Why from "./Components/WhyPlantopia/WhyPlantopia";
import Footer from "./Components/Footer/Footer";
import WishView from "./Components/WishView/WishView";
import CartView from "./Components/CartView/CartView";
import Checkout from "./Components/Checkout/Checkout";
import ProductNotFound from "./Components/ProductNotFound/ProductNotFound";
import LoginScreen from "./Components/Auth/LoginScreen";
import RegisterScreen from "./Components/Auth/RegisterScreen";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <AuthContextProvider>
        <DarkModeProvider>
          <CartProvider>
            <WishProvider>
              <BrowserRouter>
                {user.logged ? (
                  <>
                    <SearchProvider>
                      <Header />

                      <Routes>
                        <Route
                          path="/"
                          element={
                            <div>
                              <Carrousel />
                              <CategoriesMenu />
                              <Categories />
                              <ItemListContainer />
                              <Delivery />
                              <Guarantee />
                            </div>
                          }
                        />

                        <Route
                          path="/products/:categoryId"
                          element={
                            <div>
                              <PortadaCat />
                              <CategoriesMenu />
                              <Categories />
                              <ItemListContainer />
                              <Delivery />
                              <Guarantee />
                            </div>
                          }
                        />

                        <Route
                          path="/detail/:itemId"
                          element={<ItemDetailContainer />}
                        />

                        <Route path="/wish" element={<WishView />} />

                        <Route path="/cart" element={<CartView />} />

                        <Route path="/checkout" element={<Checkout />} />

                        <Route
                          path="/contact"
                          element={
                            <div>
                              <Store />
                              <Contact />
                            </div>
                          }
                        />
                    <Route
                          path="/about"
                          element={
                            <div>
                              <About />
                              <Why />
                            </div>
                          }
                        />

                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                      <Footer />
                    </SearchProvider>
                  </>
                ) : (
                  <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
                )}
              </BrowserRouter>
            </WishProvider>
          </CartProvider>
        </DarkModeProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

   
            