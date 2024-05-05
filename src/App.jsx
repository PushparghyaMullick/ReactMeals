import './App.css'
import Header from './components/Layout/Header'
import { useState, Fragment } from 'react'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {
  const [showCart, setShowCart] = useState(false)

  return (
    <CartProvider>
      {showCart && <Cart onCartClose={() => setShowCart(false)}/>}
      <Header onCartShow={() => setShowCart(true)} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
