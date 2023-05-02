import { MENU } from "../data/menu";
import { STATUSES } from "../data/statuses";

/**
 * Adds an item to a table's order tab, given the table name and item object.
 *
 * Precondition: The item object is not null and includes a name, quantity, and price.
 *               The name of the item is in the MENU.
 *
 * Post-condition: The item is added to the correct tab in the TABLES object.
 *
 * @param {string} tableName - The name of the table to add the item to.
 * @param {Object} item - An object representing the item to add.
 * @returns {Array} - The updated order tab for the given table.
 * @throws {Error} - If the item object is missing a name, quantity, or price,
 *                   or if the name of the item is not in the MENU.
 */
export const addItemToOrder = (TABLES, tableName, item) => {
    const table = TABLES[tableName];

    // Validate the item object
    if(!item) {
        throw new Error('Invalid item object: undefined');
    }
    
    //Validate the item object has the correct properties
    if (!item.hasOwnProperty('name') || !item.hasOwnProperty('quantity') || !item.hasOwnProperty('price')) {
        throw new Error('Invalid item object: missing name, quantity, or price');
    }

    // Validate the item is in the menu
    let itemFound = false;
    MENU.forEach(menuItem => { if(menuItem.name === item.name) itemFound = true; });
    if (!itemFound) {
        throw new Error('Invalid given item: Item is not in menu');
    }
    
    item.status = STATUSES.ORDERED;
    item.paid = false;
    item.cooked = false;
    table.tab.push(item);

    return table.tab;
}