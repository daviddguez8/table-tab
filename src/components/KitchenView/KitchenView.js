import {Container, Form, Row, Button, Table} from 'react-bootstrap';
import './KitchenView.css';
import { useEffect, useState } from 'react';
import { KITCHEN_STATUSES } from "../../data/statuses";
import {fetchToTables, pushTableToFirebase} from "../../backend/firestore";


// This is the kitchen view.
function KitchenView() {
    const [selectedTable] = useState('');
    const [TABLES, setTables] = useState({});
    const [ item, setItems] = useState([]);

    useEffect(() => {
        fetchToTables(setTables)
    }, []);

    const handleStatusChange = async (tableId, itemIdx, newStatus) => {
        const item = TABLES[selectedTable].tab[itemIdx];
        item.status = newStatus;
        TABLES[selectedTable].tab[itemIdx] = item;

        await pushTableToFirebase(TABLES[selectedTable]);
        await fetchToTables(setTables);
    }

    const handleItemReady = (index, item) => {
        const updatedItems = [item];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    }

    return (
        <Container className="main-container">
            <Row className='fixed-top topbar'>
                <h1>Table Tab</h1>
            </Row>

            <Row className="content-container mb-3">
                <h2>Kitchen View</h2>
            </Row>

            {/*Displays only when a table is selected*/}
            {/*{selectedTable !== '' &&*/}
                <Row className="table-container">
                    <Container className="table-info-container mb-3">
                        <h3 className="mb-3">Items to Cook</h3>
                    </Container>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Call Waiter?</th>
                            </tr>
                        </thead>
                        <tbody>
                        {/*TABLES[selectedTable]*/}
                        {Object.keys(TABLES).map((tableId) => {
                            const table = TABLES[tableId];
                            // console.log(TABLES[tableId])
                            return table.tab.map((item, index) => {
                                console.log("Grillo", table)
                                return (
                                    <tr key={`${tableId}-${index}`}>
                                        <td>{tableId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <Form.Select required aria-label="Default select example"
                                                         defaultValue={item.status}
                                                         onChange={(e) => {
                                                             handleStatusChange(tableId, index, e.target.value)
                                                         }}>
                                                {Object.values(KITCHEN_STATUSES).map((status) => {
                                                    return (
                                                        <option key={status}
                                                                selected={item.status === status}>{status}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            {item.status === 'Cooked' ? (
                                                <Button className='w-100' variant='primary'
                                                        onClick={() => handleItemReady(index, item)}>
                                                    Item is Ready
                                                </Button>
                                            ): item.status === 'Cooking' ? (
                                                <span>Cooking...</span>
                                            ) : null}
                                        </td>
                                    </tr>
                                )
                            })
                        })}
                        </tbody>
                    </Table>
                </Row>
        </Container>
    );
}

export default KitchenView;
