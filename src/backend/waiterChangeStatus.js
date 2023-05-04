import { STATUSES } from '../data/statuses';
import { TABLES } from '../data/tables';

/**
 * Changes the status of an item in the specified table to a new status.
 * @param {string} tableName - The name of the table to modify.
 * @param {number} itemIdx - The index of the item in the table's order to modify.
 * @param {string} newStatus - The new status to assign to the item.
 *                             Must not be 'Cooked', which is reserved for the kitchen.
 * @throws {Error} If the specified tableName is invalid.
 * @throws {Error} If the specified newStatus is 'Cooked'.
 * @throws {Error} If the specified itemIdx is out of bounds for the table's order.
 * @returns {Array} The modified order array for the specified table.
 */
export const waiterChangeStatus = (tableName, itemIdx, newStatus) => {
    
    let validTableName = false;
    Object.keys(TABLES).forEach((table) => {
        if(table === tableName) {
            validTableName = true;
        }
    });
    //Throw an exception if tableName is invalid
    if(!validTableName) {
        throw new Error('Invalid table name');
    }

    //Throw an exception if newStatus is 'Cooked'
    if(newStatus === STATUSES[1]) {
        throw new Error('Invalid status for waiter: Only kitchen can mark as cooked')
    }
    
    const tableTab = TABLES[tableName].tab;

    //Throw an exception if itemIdx is out of bounds
    if(itemIdx >= tableTab.length) {
        throw new Error('Invalid item index: out of bounds');
    }

    //Change the status of the item to the new status
    tableTab[itemIdx].status = newStatus;    

    return tableTab;
}