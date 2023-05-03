import { getNextAvailable } from "../selectTable";
import { TABLES } from "../../data/tables";

describe('getNextAvailable', () => {
    it('should return null if no available table is found for the given number of people', () => {
        const people = 20;
        const expectedTable = null;
        const result = getNextAvailable(people);
        expect(result).toEqual(expectedTable);
    });

    it('should return Table 1 for 1 person', () => {
        const result = getNextAvailable(1);
        expect(result).toBe('Table 1');
    });

    it('should return Table 5 for 10 people', () => {
        const result = getNextAvailable(10);
        expect(result).toEqual('Table 5');
    });

    it('should return null if the input is invalid', () => {
        const people = -1;
        const expectedTable = null;
        const result = getNextAvailable(people, TABLES);
        expect(result).toBe(expectedTable);
    });

    it('should return null if no tables are available', () => {
        const people = 13;
        const expectedTable = null;
        const result = getNextAvailable(people, TABLES);
        expect(result).toBe(expectedTable);
    });
});