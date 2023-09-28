import React from "react";

const MenuItemDetails = ({ item }) => {
  const { name, description, price, ingredients } = item;

  return (
    <div className="menu-item-details">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Price: €{price}</p>
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemDetails;