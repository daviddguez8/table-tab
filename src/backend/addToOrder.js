import { TABLES } from "../data/tables";

export const addItemsToOrder = (tableName, items = []) => {
    const table = TABLES[tableName];
    items.forEach((item) => {
        item.status = 'ordered';
        item.paid = false;
        item.cooked = false;
        table.tab.push(item);
    });
    return table.tab;
}

export const addItemToOrder = (tableName, item) => {
    const table = TABLES[tableName];

    item.status = 'ordered';
    item.paid = false;
    item.cooked = false;
    table.tab.push(item);

    return table.tab;
}