import { render } from "@testing-library/react";
import { markItemReady, markItemsReady, markItemsPaid } from "../markReady";
import { TABLES } from "../../data/tables";
import { MENU } from '../../data/menu';


describe('markReady', () => {
  it('Change cooked items from false to true.', () => {

    const tableName = 'Table 1';
    const items = [
      { name: 'Burger', price: 10.99, cooked : false },
      { name: 'Fries', price: 5.99, cooked : false }
    ];

    const updatedTab = markItemsReady(tableName, items);

    expect(updatedTab[0].cooked).toBe(true);
    expect(updatedTab[1].status).toBe("Ready");
    expect(updatedTab[1].paid).toBe(false);
    expect(updatedTab[0].paid).toBe(false);
  });

  it('Change paid items from false to true.', () => {

    const tableName = 'Table 3';
    const items = [
      { name: 'Burger', price: 10.99, paid : false },
      { name: 'Fries', price: 5.99, paid : false }
    ];

    const updatedTab = markItemsPaid(tableName, items);

    expect(updatedTab[0].paid).toBe(true);
    expect(updatedTab[1].status).toBe("Paid");
    expect(updatedTab[0].cooked).toBe(false);
  });
});

function sortMenuByPrice(menu) {
  return menu.sort((a, b) => a.price - b.price);
}

describe('sortMenuByPrice', () => {
  it('Sort the menu by price.', () => {
    const sortedMenu = sortMenuByPrice(MENU);
    const expectedMenu = [
      {
        name: 'Fries',
        price: 4.99,
      },
      {
        name: 'Salad',
        price: 6.99,
      },
      {
        name: 'Tacos',
        price: 7.99,
      },
      {
        name: 'Burrito',
        price: 8.99,
      },
      {
        name: 'Burger',
        price: 8.99,
      },
      {
        name: 'Pizza',
        price: 10.99,
      },
      {
        name: 'Salmon',
        price: 10.99,
      },
      {
        name: 'Sushi',
        price: 12.99,
      },
    ];
    expect(sortedMenu).toEqual(expectedMenu);
  });
});

describe('Price is not 0.', () => {
  test('Total price is greater than 0.', () => {
    let price = 0;

    for (let i = 0; i < MENU.length; i++) {
      if (price <= MENU[i].price) {
        price = MENU[i].price;
      }
    }

    expect(price).toBeGreaterThan(0);
  });
});

describe('Adding an item to a tab', () => {
  it('Should the first item of the menu to the tab', () => {
    const table = TABLES['Table 1'];
    const item = MENU[0]; // Get the first item from the menu
    if (table.available) {
      // Add the item to the table tab is the table is available.
      table.tab.push(item);
    }
    expect(table.tab).toContain(item);
  });
  it('Should not add the first item of the menu to the tab', () => {
    const table = TABLES['Table 2'];
    const item = MENU[0]; // Get the first item from the menu
    if (table.available) {
      // Add the item to the table tab is the table is available.
      table.tab.push(item);
    }
    expect(table.tab).not.toContain(item);
  });
});
