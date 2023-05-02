import { TABLES } from "../data/tables";

export const markItemsReady = (tableName, items = []) => {
    const table = TABLES[tableName];
    items.forEach((item) => {
        item.status = 'Ready';
        item.paid = false;
        item.cooked = true;
        table.tab.push(item);
    });
    return table.tab;
}

export const markItemsPaid = (tableName, items = []) => {
    const table = TABLES[tableName];
    items.forEach((item) => {
        item.status = 'Paid';
        item.paid = true;
        item.cooked = false;
        table.tab.push(item);
    });
    return table.tab;
}

export const markItemReady = (tableName, item) => {
    const table = TABLES[tableName];

    item.status = 'Ready';
    item.paid = false;
    item.cooked = true;
    table.tab.push(item);

    return table.tab;
}