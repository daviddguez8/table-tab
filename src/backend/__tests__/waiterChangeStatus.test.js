import { waiterChangeStatus } from "../waiterChangeStatus";
import { STATUSES } from '../../data/statuses';
import { addItemToOrder } from "../addToOrder";
import { MENU } from '../../data/menu';

describe('waiterChangeStatus black-box testing', () => {
    beforeAll(() => {
        const itemInMenu = MENU[0];
        const itemToAdd = { name: itemInMenu.name, price: itemInMenu.price, quantity: 1 };
        addItemToOrder('Table 1', itemToAdd);
    })

    it('Throws an exception when the waiter tries to change an item to cook', () => {
        const cookedStatus = STATUSES[1];
        const tableName = 'Table 1';
        const itemIdx = 0;
        expect(() => waiterChangeStatus(tableName, itemIdx, cookedStatus)).toThrow('Invalid status for waiter: Only kitchen can mark as cooked');
    });

    it('Changes the status of the item to the new status', () => {
        const tableName = 'Table 1';
        const itemIdx = 0;
        const newStatus = STATUSES[2];
        const updatedTab = waiterChangeStatus(tableName, itemIdx, newStatus);
        expect(updatedTab[itemIdx].status).toBe(newStatus);
    });

    it('Throws an error when the item index is out of bounds', () => {
        const tableName = 'Table 1';
        const itemIdx = 100;
        const newStatus = STATUSES[2];
        expect(() => waiterChangeStatus(tableName, itemIdx, newStatus)).toThrow('Invalid item index: out of bounds');
    });

    it('Throws an error when the table name is invalid', () => {
        const tableName = 'Table 100';
        const itemIdx = 0;
        const newStatus = STATUSES[2];
        expect(() => waiterChangeStatus(tableName, itemIdx, newStatus)).toThrow('Invalid table name');
    });
});

describe('waiterChangeStatus white-box testing', () => {

    beforeAll(() => {
        const itemInMenu = MENU[0];
        const itemToAdd = { name: itemInMenu.name, price: itemInMenu.price, quantity: 1 };
        addItemToOrder('Table 1', itemToAdd);
    });

    it('Not a table path: 1,2,3,4,5,6', () => {
        const tableName = 'Table 100';
        const itemIdx = 0;
        const newStatus = STATUSES[2];
        expect(() => waiterChangeStatus(tableName, itemIdx, newStatus)).toThrow('Invalid table name');

    });

    it('Cooked status path: 1, 2, 3, 4, 5, 7, 8', () => {
        const tableName = 'Table 1';
        const itemIdx = 0;
        const newStatus = STATUSES[1];
        
        expect(() => {waiterChangeStatus(tableName, itemIdx, newStatus)}).toThrow('Invalid status for waiter: Only kitchen can mark as cooked')
    });

    it('Item index out of bounds path: 1, 2, 3, 4, 5, 7, 9, 10, 11', () => {
        const tableName = 'Table 1';
        const itemIdx = 100;
        const newStatus = STATUSES[2];
        expect(() => waiterChangeStatus(tableName, itemIdx, newStatus)).toThrow('Invalid item index: out of bounds');
    });

    it('Valid path: 1, 2, 3, 4, 5, 7, 9, 10, 12', () => {
        const tableName = 'Table 1';
        const itemIdx = 0;
        const newStatus = STATUSES[2];
        const updatedTab = waiterChangeStatus(tableName, itemIdx, newStatus);
        expect(updatedTab[itemIdx].status).toBe(newStatus);
    });
});
