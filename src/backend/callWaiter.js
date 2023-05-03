import { TABLES } from "../data/tables";

export const callWaiter = (tableName) => {
    const table = TABLES[tableName];

    if(table.waiterAssigned) {
        table.needsHelp = true;
        return table.waiter;
    }

    return null;
}