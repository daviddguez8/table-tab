import { TABLES } from "../data/tables";

export const addItemToCook = (tableName, item) => {
    const table = TABLES[tableName];

    item.status = 'Cooking';
    item.paid = false;
    item.cooked = false;
    table.tab.push(item);

    return table.tab;
}