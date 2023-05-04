import { Container, Form, Row, Button, Table } from 'react-bootstrap';
import './KitchenView.css';
import { useState } from 'react';
import { TABLES } from '../../data/tables';
import { MENU } from '../../data/menu';
import { itemsToCook } from '../../backend/foodQueue';
import { markItemReady } from '../../backend/markReady';
import { addItemToOrder } from '../../backend/addToOrder';


function KitchenView() {
    const [selectedTable, setSelectedTable] = useState('');
    const [markingReady, setMarkingReady] = useState(false);
    const [selectedItemIdx, setSelectedItemIdx] = useState(-1);
    const [selectedItemQuantity, setSelectedItemQuantity] = useState(0);

    const queue = () => {
        const itemToAdd = MENU[selectedItemIdx];
        console.log(itemToAdd);
        const tableTab = TABLES[selectedTable];

        // console.log(selectedTableTab);
        // console.log(items);
        // items.tab = selectedTableTab;
        itemsToCook(tableTab)
        // itemToCook(selectedTable, items);
        // setSelectedTableTab([]);
    }

    const readyItems = () => {
        console.log(selectedItemIdx);
        const items = TABLES[selectedTable];
        console.log(items.tab);
        markItemReady(selectedTable, items);
        setSelectedItemQuantity(0);
        setSelectedItemIdx(-1);
    }

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
                <h1>Kitchen View</h1>
            </Row>

            <Row className="content-container mb-3">
                <h3>Items to cook</h3>
                <Form.Select aria-label="Default select example"
                             onChange={(e) => {
                                 e.preventDefault();
                                 setSelectedTable(e.target.value);
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

                    {!markingReady ? (
                        <Button className="mb-3" onClick={(e) => {
                            setMarkingReady(true);
                        }}> Set Item Ready </Button>
                    ) : (
                        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                            <Form>
                                <Form.Group controlId="formNumberInput" className="mb-3">
                                    <Form.Label>Select item to mark ready</Form.Label>
                                    <option>Select Item</option>
                                    <Form.Select required aria-label="Default select example"
                                                 value={selectedItemIdx}
                                                 onChange={(e) => {

                                                     console.log(e.target.value);
                                                     setSelectedItemIdx(e.target.value)
                                                 }}>
                                        value={TABLES[selectedTable].tab.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {item.name}
                                            </option>
                                            )
                                        })}>
                                    </Form.Select>
                                </Form.Group>
                                <Button className="mb-3" type="submit" onClick={(e) => {
                                    readyItems();
                                }}>Mark Ready</Button>
                            </Form>
                        </Container>
                    )}

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
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

export default KitchenView;
