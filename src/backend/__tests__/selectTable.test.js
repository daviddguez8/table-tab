import { render } from "@testing-library/react";
import { TABLES } from "../../data/tables";
import { selectTable } from "../selectTable";



describe('selectTable', () => {
  it('allows a waiter to select a specific table', () => {

    const tableName = 'Table 1';

    const initialTableWaiter = TABLES[tableName].waiterAssigned

    expect(initialTableWaiter).toBe(false);

    const updatedTableWaiter = selectTable(tableName).waiterAssigned;

    expect(updatedTableWaiter).toBe(true);
  });
});