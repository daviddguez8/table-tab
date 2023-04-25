import { TABLES } from "../data/tables";

export const selectTable = (tableName) => {
    const table = TABLES[tableName];

    table.waiterAssigned = true;

    return table;
}
