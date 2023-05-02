import * as table from "@testing-library/user-event/dist/tab";

export const itemsToCook = (tableName) => {
    const items = table.tab;
    items.status = 'Cooking';
    items.paid = false;
    items.cooked = false;
    table.tab.push(items);

    return table.tab;
}