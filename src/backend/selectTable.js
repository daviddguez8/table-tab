import { TABLES } from "../data/tables";

/**
 * getNextAvailable - finds the next available table for a given number of people
 *
 * @param {number} people - number of people in the group
 * @returns {string|null} - table number (e.g. "Table 1") or null if no table is available
 */
export const getNextAvailable = (people) => {
    if (people <= 0) {
        return null; 
    }

    let availableTable = null;

    for (const table in TABLES) {
      if (TABLES[table].available && TABLES[table].maxPeople >= people) {
        availableTable = table;
        break;
      }
    }
    return availableTable; // no available tables found
};

export const selectTable = (tableName) => {
    const table = TABLES[tableName];

    table.waiterAssigned = true;

    return table;
}
