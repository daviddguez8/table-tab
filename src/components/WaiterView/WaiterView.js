import { Container, Form, Row, Button, Table, InputGroup, ListGroup } from 'react-bootstrap';
import './waiterView.css';
import { useState } from 'react';
import { TABLES } from '../../data/tables';
import { MENU } from '../../data/menu';
import { addItemToOrder } from '../../backend/addToOrder';


function WaiterView() {
    const [selectedTable, setSelectedTable] = useState('');
    const [addingItems, setAddingItems] = useState(false);

    const [selectedItemIdx, setSelectedItemIdx] = useState(-1);
    const [selectedItemQuantity, setSelectedItemQuantity] = useState(0);
   

    const handleItemAdded = () => {
        console.log(selectedItemIdx);
        const itemToAdd = MENU[selectedItemIdx];
        console.log(itemToAdd);
        itemToAdd.quantity = selectedItemQuantity;

        addItemToOrder(selectedTable, itemToAdd);
    
        setSelectedItemQuantity(0);
        setSelectedItemIdx(-1);
    }

    return (
        <Container className="main-container">
            <Row className='fixed-top topbar'>
                <h1>Waiter View</h1>
            </Row>

            <Row className="content-container mb-3">
                <h3>Select a table from below:</h3>
                <Form.Select aria-label="Default select example"
                    onChange={(e) => {
                        e.preventDefault();
                        setSelectedTable(e.target.value)
                    }}>
                    <option>Select table</option>
                    <option value="Table 1">Table 1</option>
                    <option value="Table 2">Table 2</option>
                    <option value="Table 3">Table 3</option>
                    <option value="Table 4">Table 4</option>
                    <option value="Table 5">Table 5</option>
                    <option value="Table 6">Table 6</option>
                    <option value="Table 7">Table 7</option>
                </Form.Select>
            </Row>
            
            {/*Displays only when a table is selected*/}
            {selectedTable !== '' &&
                <Row className="table-container">
                    <h2 className="mb-3">{selectedTable}</h2>
                    <p>Available: {TABLES[selectedTable].available ? 'Yes' : 'No'}</p>
                    <p>Num People: {TABLES[selectedTable].people}</p>
                    <p>Total ordered: $ TODO COMPLETE</p>
                    <p>Total paid: $ TODO COMPLETE</p>
                    <p>Needs Help: {TABLES[selectedTable].needsHelp ? 'Yes' : 'No'}</p>
                    <p>Items to be delivered?: TODO COMPLETE</p>



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
                                    value={selectedItemIdx}
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
                                        <td>{item.status}</td>
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
