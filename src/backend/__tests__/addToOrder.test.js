import { render } from "@testing-library/react";
import { addItemsToOrder, addItemToOrder } from "../addToOrder";
import { TABLES } from "../../data/tables";



describe('addItemToOrder', () => {
  it('adds item to the specified table', () => {

    const tableName = 'Table 1';
    const items = [
      { name: 'Burger', price: 10.99 },
      { name: 'Fries', price: 5.99 }
    ];

    const initialTabLength = TABLES[tableName].tab.length;
    const updatedTab = addItemToOrder(tableName, items);
    const updatedTabLength = updatedTab.length;

    expect(updatedTabLength).toBe(initialTabLength + 1);
    expect(TABLES[tableName].tab).toEqual(updatedTab);
  });

  it('initializes the fields of paid status and cooked', () => {
    const tableName = 'Table 1';
    const items = [
      { name: 'Burger', price: 10.99 },
      { name: 'Fries', price: 5.99 }
    ];

    const updatedTab = addItemToOrder(tableName, items);

    expect(updatedTab[updatedTab.length-1].status).toBe('ordered');
    expect(updatedTab[updatedTab.length-1].paid).toBe(false);
    expect(updatedTab[updatedTab.length-1].cooked).toBe(false);
  })
});