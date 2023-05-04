import { MENU } from '../data/menu.js';
import { getDoc, doc, collection, addDoc, getFirestore, getDocs, query, onSnapshot, setDoc, where } from 'firebase/firestore';
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

export const pushTableToFirebase = async (table) => {
    // Get a reference to the 'tables' collection
    const db = getFirestore(app);
    const tablesCollection = collection(db, 'tables');


    //Query the tables collection to get the document where doc.name == table.name
    const q = query(tablesCollection, where("name", "==", table.name));

    //Get the document reference
    await getDocs(q).then((querySnapshot) => {
        const thisTable = querySnapshot.docs[0];
        setDoc(thisTable.ref, {
            name: table.name,
            available: table.available,
            needsHelp: table.needsHelp,
            people: table.people,
            maxPeople: table.maxPeople,
            waiter: table.waiter,
            tab: table.tab,
            waiterAssigned: table.waiterAssigned
        }).then(() => {
            console.log("Table successfully written!");
        }
        ).catch((error) => {
            console.error("Error writing document: ", error);
        });

    });


}

export const fetchToTables = async (setTables) => {
    const db = getFirestore(app);
    const tablesCollection = collection(db, 'tables');
    const q = query(tablesCollection);
    const tables = {};

    getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tables[doc.data().name] = doc.data();
        });
        setTables(tables);
    });

    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tables[doc.data().name] = doc.data();
        });
        setTables(tables);
    });

}


//WARNING: This function will overwrite the entire table collection in the database, use only after resetting the collection manually
export const pushTablesToFirebase = async () => {
    // Get a reference to the 'tables' collection
    const db = getFirestore(app);
    const tablesCollection = collection(db, 'tables');

    // Loop through the TABLES dictionary and add each object as a document to the 'tables' collection
    Object.keys(TABLES).forEach(tableName => {
        // Create a reference to the document with the custom ID
        const tableDocRef = doc(tablesCollection, tableName);

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