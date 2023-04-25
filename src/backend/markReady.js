import { TABLES } from "../data/tables";

export const markItemReady = (tableName, item) => {
    const table = TABLES[tableName];

    item.status = 'Ready';
    item.paid = false;
    item.cooked = true;
    table.tab.push(item);

    return table.tab;
}