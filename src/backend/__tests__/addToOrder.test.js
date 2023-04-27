
import { addItemToOrder } from "../addToOrder";
import { TABLES } from "../../data/tables";
import { MENU } from '../../data/menu';

describe('addItemToOrder black-box testing', () => {
  it('adds item to the specified table', () => {
    const tableName = 'Table 1';
    const itemInMenu = MENU[0];
    const item = {name: itemInMenu.name, price: itemInMenu.price}; //Creating a copy of the item in the menu
    item.quantity = 1;

    const initialTabLength = TABLES[tableName].tab.length;
    const updatedTab = addItemToOrder(tableName, item);
    const updatedTabLength = updatedTab.length;

    expect(updatedTabLength).toBe(initialTabLength + 1);
    expect(TABLES[tableName].tab).toEqual(updatedTab);
  });

  it('initializes the fields of paid status and cooked', () => {
    const tableName = 'Table 1';
    const itemInMenu = MENU[0];
    const item = {name: itemInMenu.name, price: itemInMenu.price}; //Creating a copy of the item in the menu
    item.quantity = 1;

    const updatedTab = addItemToOrder(tableName, item);

    expect(updatedTab[updatedTab.length-1].status).toBe('Ordered');
    expect(updatedTab[updatedTab.length-1].paid).toBe(false);
    expect(updatedTab[updatedTab.length-1].cooked).toBe(false);
  });

  it('throws an error if the item object is missing quantity', () => {
    const tableName = 'Table 1';
    const itemInMenu = MENU[0];
    const item = {name: itemInMenu.name, price: itemInMenu.price}; //Creating a copy of the item in the menu

    expect(() => addItemToOrder(tableName, item)).toThrow('Invalid item object: missing name, quantity, or price');
  });

  it('throws an error if the item is not in the menu', () => {
    const tableName = 'Table 1';
    const item = {name: 'Not in menu', price: 0, quantity: 1};
    
    expect(() => addItemToOrder(tableName, item)).toThrow('Invalid given item: Item is not in menu');
  });
});

describe('addItemToOrder white-box testing', () => {
  it('Undefined Item name path: 1, 2, 3' , () => {
    const invalidTableName = 'Table 1';
    const item = undefined;

    expect(() => addItemToOrder(invalidTableName, item)).toThrow('Invalid item object: undefined');
  });

  it('Missing property on item path: 1, 2, 4, 5', () => {
    const invalidTableName = 'Table 1';
    const item = {name: 'Burger', price: 10};

    expect(() => addItemToOrder(invalidTableName, item)).toThrow('Invalid item object: missing name, quantity, or price');
  });

  it('Item not in menu path: 1, 2, 4, 6, 7, 8, 9, 10, 11', () => {
    const tableName = 'Table 1';
    const item = {name: 'Not in menu', price: 0, quantity: 1};

    expect(() => addItemToOrder(tableName, item)).toThrow('Invalid given item: Item is not in menu');
  });

  it('Complete execution path: 1, 2, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16', () => {
    const tableName = 'Table 1';
    const itemInMenu = MENU[0];
    const item = {name: itemInMenu.name, price: itemInMenu.price}; //Creating a copy of the item in the menu
    item.quantity = 1;

    expect(() => addItemToOrder(tableName, item)).not.toThrow();
    const results = addItemToOrder(tableName, item);
    expect(results).toEqual(TABLES[tableName].tab);
  });
});
