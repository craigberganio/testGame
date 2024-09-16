import React, { useState } from 'react';

const ITEMS = {
  WOOD: 'Wood',
  STONE: 'Stone',
  AXE: 'Axe',
  PICKAXE: 'Pickaxe',
};

const RECIPES = {
  [ITEMS.AXE]: { [ITEMS.WOOD]: 3, [ITEMS.STONE]: 2 },
  [ITEMS.PICKAXE]: { [ITEMS.WOOD]: 2, [ITEMS.STONE]: 3 },
};

function InventorySystem() {
  const [inventory, setInventory] = useState({
    [ITEMS.WOOD]: 0,
    [ITEMS.STONE]: 0,
    [ITEMS.AXE]: 0,
    [ITEMS.PICKAXE]: 0,
  });

  const addItem = (item, amount = 1) => {
    setInventory(prev => ({ ...prev, [item]: prev[item] + amount }));
  };

  const removeItem = (item, amount = 1) => {
    setInventory(prev => ({ ...prev, [item]: Math.max(0, prev[item] - amount) }));
  };

  const canCraft = (item) => {
    const recipe = RECIPES[item];
    return Object.entries(recipe).every(([ingredient, amount]) => inventory[ingredient] >= amount);
  };

  const craft = (item) => {
    if (canCraft(item)) {
      Object.entries(RECIPES[item]).forEach(([ingredient, amount]) => removeItem(ingredient, amount));
      addItem(item);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 20, right: 20, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 }}>
      <h3>Inventory</h3>
      {Object.entries(inventory).map(([item, amount]) => (
        <div key={item}>{item}: {amount}</div>
      ))}
      <h3>Craft</h3>
      {Object.keys(RECIPES).map(item => (
        <button key={item} onClick={() => craft(item)} disabled={!canCraft(item)}>
          Craft {item}
        </button>
      ))}
    </div>
  );
}

export default InventorySystem;