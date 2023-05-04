import { Container, Form, Row, Button, Table } from 'react-bootstrap';
import './waiterView.css';
import { useEffect, useState } from 'react';
//import { TABLES } from '../../data/tables';
import { MENU } from '../../data/menu';
import { addItemToOrder } from '../../backend/addToOrder';
import { STATUSES } from '../../data/statuses';
import { fetchToTables, pushMenuToFirebase, pushTableToFirebase } from '../../backend/firestore';
import { deleteItemFromTab } from '../../backend/deleteFromTab';


function WaiterView() {
    const [selectedTable, setSelectedTable] = useState('');
    const [addingItems, setAddingItems] = useState(false);

    const [selectedItemIdx, setSelectedItemIdx] = useState(-1);
    const [selectedItemQuantity, setSelectedItemQuantity] = useState(0);

    const [TABLES, setTables] = useState({});

    useEffect(() => {
        fetchToTables(setTables)
    }, []);

    useEffect(() => {
        console.log(selectedTable);
    }, [selectedTable])


    const handleItemAdded = async () => {
        if (selectedItemIdx == -1) {
            alert('Please select an item from the menu');
            return;
        }

        if (selectedItemQuantity <=0) {
            alert('Please select a quantity greater than 0');
            setSelectedItemQuantity(1);
            return;
        }
        const itemInMenu = MENU[selectedItemIdx];
        const itemToAdd = { name: itemInMenu.name, price: itemInMenu.price };
        itemToAdd.quantity = selectedItemQuantity;

        TABLES[selectedTable].tab = [...TABLES[selectedTable].tab, itemToAdd];
        
        await pushTableToFirebase(TABLES[selectedTable]);
        await fetchToTables(setTables);

        setSelectedItemQuantity(0);
        setSelectedItemIdx(-1);
    }
    
    //TODO: Implement this function and correctly connect
    const handleStatusChange = (itemIdx, newStatus) => {

    }

    const calculateTotal = (tab) => {
        let total = 0;
        tab.forEach(item => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    }

    const calculateTotalPaid = (tab) => {
        let total = 0;
        tab.forEach(item => {
            if (item.status === STATUSES.PAID) {
                total += item.price * item.quantity;
            }
        });
        return total.toFixed(2);
    }

    const calculateBalance = (tab) => {
        return calculateTotal(tab) - calculateTotalPaid(tab);
    }

    const handleDeleteItem = (itemTabIndex) => {
        TABLES[selectedTable].tab = deleteItemFromTab(TABLES[selectedTable].tab, itemTabIndex)
        setTables(TABLES);
        pushTableToFirebase(TABLES[selectedTable]).then(() => {
            fetchToTables(setTables);
        });
    }

    return (
        <Container className="main-container">
            <Row className='fixed-top topbar'>
                <h1>TableTab</h1>
            </Row>

            <Row className="content-container mb-3">
                <h3>Select a table from below:</h3>
                <Form.Select aria-label="Default select example"
                    key={selectedTable}
                    value={selectedTable}
                    onChange={(e) => {
                        e.preventDefault();
                        setSelectedTable(e.target.value)

                    }}>
                    <option>Select table</option>
                    {Object.keys(TABLES).sort().map((tableName, idx) => {
                        return <option value={tableName} key={idx} style={ TABLES[tableName].needsHelp? {backgroundColor: "red"}:{}}>{tableName}</option>
                    })}
                </Form.Select>
            </Row>

            {/*Displays only when a table is selected*/}
            {selectedTable !== '' &&
                <Row className="table-container mb-3">
                    <Container className="table-info-container mb-3">
                        
                    <h2 className="mb-3">{selectedTable}</h2>
                    <p>Available: {TABLES[selectedTable].available ? 'Yes' : 'No'}</p>
                    <p>Num People: {TABLES[selectedTable].people}</p>
                    <p>Total ordered: $ {calculateTotal(TABLES[selectedTable].tab)}</p>
                    <p>Total paid: $ {calculateTotalPaid(TABLES[selectedTable].tab)}</p>
                    <p>Remaining balance: $ {calculateBalance(TABLES[selectedTable].tab)}</p>
                    {/*TODO: Complete attend call funcionality */}
                    <p>Needs Help: {TABLES[selectedTable].needsHelp ? 'Yes' : 'No'} <Button variant="outline-info">Attend call</Button></p>
                    {/*TODO: Complete this functionality */}
                    <p>Items to be delivered?: TODO COMPLETE</p>

                    </Container>
                    
                    {/*Displays only when adding items to order*/}
                    {!addingItems ? (
                        <Button className="mb-3" onClick={(e) => {
                            e.preventDefault();
                            setAddingItems(true);
                        }}> Add items to order: </Button>
                    ) : (
                        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                            <Form>
                                <Form.Select required aria-label="Default select example"
                                    value={MENU[selectedItemIdx] ? selectedItemIdx : -1}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                        setSelectedItemIdx(e.target.value)
                                    }}>
                                    <option>Select Item</option>
                                    {MENU.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={index}
                                            >
                                                {item.name} - {item.price}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                                <Form.Group controlId="formNumberInput" className="mb-3">
                                    <Form.Label>Quantity:</Form.Label>
                                    <Form.Control value={selectedItemQuantity} required type="number" placeholder="Enter a number" onChange={(e) => { setSelectedItemQuantity(e.target.value) }} />
                                </Form.Group>
                                <Button className="mb-3" type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    handleItemAdded();
                                }}>Add to order</Button>
                            </Form>
                        </Container>
                    )}

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TABLES[selectedTable].tab.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <Form.Select required aria-label="Default select example"
                                                defaultValue={item.status}
                                                onChange={(e) => { handleStatusChange(index, e.target.value) }}>
                                                {Object.values(STATUSES).map((status) => {
                                                    return (
                                                        <option key={status} selected={item.status === status}>{status}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => {handleDeleteItem(index)}}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            } 
        </Container>
    );
}

export default WaiterView;
