import React,{ useState } from "react";
import MenuItemDetails from "./MenuItemDetails";


const Menu = ({ items,addToCart }) => {

  const [selectedItem, setSelectedItem] = useState(null);

  const showItemDetails = (item) => {
    if (selectedItem && selectedItem.id === item.id) {
      // If the same item is clicked again, hide the details
      setSelectedItem(null);
    } else {
      // Show the details for the selected item
      setSelectedItem(item);
    }
  };

  return (
    <div className="section-center">
      {items.dishes && Object.values(items.dishes).map((item) => {
        const { id, name, image, price, tags} = item;

        return (
          <article key={id} className="menu-item">
            <img src={image} alt={name} className="photo" />
            <div className="item-info">
              <header>
                <h4>{name}</h4>
                <h4 className="price">€{price}</h4>
                    </header>
                    
                    <button
                      className="button-17"
                      type="button"
                      onClick={() => addToCart(item)} // Call addToCart with the item
                    >Add to cart</button>

                    <button
                      className="button-17"
                      type="button"
                      onClick={() => showItemDetails(item)} // Show item details when clicked
                    >Show more</button><br />
                    
                    {tags && tags.dietaryPreferences && tags.dietaryPreferences.map((tag) => (
                        <button className="button-13" key={tag} >
                            {tag}
                        </button>
                    ))}
                    <br />
                    {tags && tags.allergens && tags.allergens.map((tag) => (
                        <button className="button-13" key={tag} >
                            {tag}
                        </button>
                    ))}

                    
                    {selectedItem && selectedItem.id === item.id && (
                      <MenuItemDetails item={selectedItem} />
                    )}    
            </div>
            
            
          </article>
        );
      })}
    </div>
  );
};

export default Menu;