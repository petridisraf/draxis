
import React,{useState, useSyncExternalStore} from 'react';
import Menu from "./Menu";
import items from "./db.json";
import logo from './logo.png';
import './App.css';
const App = () =>{
  
  const[menuItems,setMenuItems]=useState(items);
  {/* Cart Code */}  
  const [cart, setCart] = useState([]);
  
  const addToCart = (item) => {
    // Create a copy of the current cart
    const updatedCart = [...cart];
  
    // Check if the item is already in the cart
    const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
  
    if (existingItemIndex !== -1) {
      // If the item is already in the cart, increase its quantity
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      updatedCart.push({ ...item, quantity: 1 });
    }
  
    // Update the cart state
    setCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
  };

  {/* Filters Code */}
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40); // Set a maximum price as an example

  const handleFilter = (filter) => {
    // Check if the filter is already selected
    if (selectedFilters.includes(filter)) {
      // Remove the filter if it's already selected
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      // Add the filter if it's not selected
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Filter menu items based on selected filters
  const filteredMenuItems = items.dishes.filter((item) => {
    const itemPrice = item.price;
    return itemPrice >= minPrice && itemPrice <= maxPrice;
  });

  const handleFilterButtonClick = (filter) => {
    // Check if the filter is already selected
    if (selectedFilters.includes(filter)) {
      // Remove the filter if it's already selected
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      // Add the filter if it's not selected
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  
  
  
 

  return (
    <main>
      <section className="cart">
        <h2>Cart</h2>
        <ul>
        {cart.map((cartItem) => (
            <li key={cartItem.id}>
              {cartItem.name} x{cartItem.quantity}
              <button
                className="remove-button"
                onClick={() => removeFromCart(cartItem.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button className="button-13">Send Order</button>
      </section>


      <section className="menu section">
        <div className="title">
          <img src={logo} alt="logo" className="logo" />
          <h2>Menu List</h2>
          <div className="underline"></div>
        </div>

        <div className="filter-buttons">
          <button onClick={() => handleFilterButtonClick("vegetarian")}>Vegetarian</button>
          <button onClick={() => handleFilterButtonClick("vegan")}>Vegan</button>
          <button onClick={() => handleFilterButtonClick("lactose-free")}>Lactose-Free</button>
          {/* Add more filter buttons for other criteria */}
        </div>

        <div className="price-filter">
          <label>Price Range:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="Min"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="Max"
          />
        </div>  


        {selectedFilters.length === 0 ? (
          // If no filters are selected, show all menu items
          <Menu items={menuItems} addToCart={addToCart} removeFromCart={removeFromCart} />
          
        ) : (
          // If filters are selected, show the filtered menu items
          <Menu items={filteredMenuItems} addToCart={addToCart} removeFromCart={removeFromCart} />
        )}

      </section>
    </main>

    
  );


}

export default App;
