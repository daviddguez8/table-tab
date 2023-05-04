import {Container, Form, Row, Button, Table, Col} from 'react-bootstrap';
import './KitchenView.css';
import { useEffect, useState } from 'react';
import {KITCHEN_STATUSES, STATUSES} from "../../data/statuses";
import {fetchToTables, pushTableToFirebase} from "../../backend/firestore";
import {deleteItemFromTab} from "../../backend/deleteFromTab";


// This is the kitchen view. l
function KitchenView() {
    const [selectedTable, setSelectedTable] = useState('');
    const [TABLES, setTables] = useState({});

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
                        {/*TODO: Complete attend call funcionality */}
                        {/*TODO: Complete this functionality */}
                        <p>Items to be delivered?: TODO COMPLETE</p>
                    </Container>

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
                        {/*TABLES[selectedTable]*/}
                        {Object.keys(TABLES).map((tableId) => {
                            const table = TABLES[tableId];
                            return table.tab.map((item, index) => {
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
                                        {item.status === 'cooked' && (
                                            <button>Call Waiter</button>
                                        )}
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
