// hybrid integration test
import { TABLES } from "../data/tables";
import { selectTable } from "./selectTable";
import { callWaiter } from "./callWaiter";

describe("callWaiter and selectTable integration", () => {
    beforeEach(() => {
        // Reset the tables before each test
        TABLES["Table 1"].waiterAssigned = false;
        TABLES["Table 1"].needsHelp = false;
    });

    it("should set the table's waiterAssigned property to true and return the waiter's name" +
        " when a waiter is assigned to the table and callWaiter is called", () => {
            // Assign a waiter to table1
            selectTable("Table 1");

            // Call callWaiter on table1
            const result = callWaiter("Table 1");

            // Verify that the waiterAssigned property is true
            expect(TABLES["Table 1"].waiterAssigned).toBe(true);

            // Verify that the needsHelp property is true
            expect(TABLES["Table 1"].needsHelp).toBe(true);

            // Verify that the result is the waiter's name
            expect(result).toBe(TABLES["Table 1"].waiter);
        });

    it("should return null and not change the table's properties when callWaiter is called on a table" +
        " that doesn't have an assigned waiter", () => {
            // Call callWaiter on table1
            const result = callWaiter("Table 1");

            // Verify that the waiterAssigned property is false
            expect(TABLES["Table 1"].waiterAssigned).toBe(false);

            // Verify that the needsHelp property is false
            expect(TABLES["Table 1"].needsHelp).toBe(false);

            // Verify that the result is null
            expect(result).toBeNull();
        });
});

// equivalance partitioning
// import { callWaiter } from "./callWaiter";

// describe("callWaiter function", () => {
//   it("should return null if the table doesn't exist", () => {
//     const result = callWaiter("non-existent table");
//     expect(result).toBeNull();
//   });

//   it("should return null if the table doesn't have an assigned waiter", () => {
//     const result = callWaiter("Table 1");
//     expect(result).toBeNull();
//   });

//   it("should return the assigned waiter's name and set the table's needsHelp to true if the table has an assigned waiter", () => {
//     const result = callWaiter("Table 2");
//     expect(result).toBe("John");
//     expect(TABLES["Table 2"].needsHelp).toBe(true);
//   });
// });

// path coverage
// import { callWaiter } from "./callWaiter";

// describe("callWaiter function", () => {
//   it("should return the assigned waiter's name and set the table's needsHelp to true if the table has an assigned waiter", () => {
//     const result = callWaiter("Table 1");
//     expect(result).toBe("John");
//     expect(TABLES["Table 1"].needsHelp).toBe(true);
//   });

//   it("should return null if the table doesn't have an assigned waiter", () => {
//     const result = callWaiter("Table 2");
//     expect(result).toBeNull();
//   });
// });


