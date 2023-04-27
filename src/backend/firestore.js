import { MENU } from '../data/menu.js';
import { collection, addDoc, getFirestore, doc } from 'firebase/firestore';
import { app } from '../firebaseConfig.js';
import { TABLES } from '../data/tables.js';


export const pushMenuToFirebase = async () => {
    // Get a reference to the 'menu' collection
    const db = getFirestore(app);
    const menuCollection = collection(db, 'menu');

    // Loop through the MENU array and add each object as a document to the 'menu' collection
    MENU.forEach(menuItem => {
        //Create a new doc in the menu collection with custom ID
        addDoc(menuCollection, {
            name: menuItem.name,
            price: menuItem.price,
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    });
};

export const pushTablesToFirebase = async () => {
    // Get a reference to the 'tables' collection
    const db = getFirestore(app);
    const tablesCollection = collection(db, 'tables');

    // Loop through the TABLES dictionary and add each object as a document to the 'tables' collection
    Object.keys(TABLES).forEach(tableName => {
        //Create a new doc in the tables collection with custom ID
        addDoc(tablesCollection, {
            name: tableName,
            available: TABLES[tableName].available,
            needsHelp: TABLES[tableName].needsHelp,
            people: TABLES[tableName].people,
            maxPeople: TABLES[tableName].maxPeople,
            waiter: TABLES[tableName].waiter,
            tab: TABLES[tableName].tab,
            waiterAssigned: TABLES[tableName].waiterAssigned
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

    });
};