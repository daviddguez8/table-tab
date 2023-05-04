import { Container, Form, Row, Button, Table } from 'react-bootstrap';
import './KitchenView.css';
import { useEffect, useState } from 'react';
import {STATUSES} from "../../data/statuses";
import {fetchToTables, pushTableToFirebase} from "../../backend/firestore";
import {deleteItemFromTab} from "../../backend/deleteFromTab";


// This is the kitchen view. l
function KitchenView() {
    const [selectedTable, setSelectedTable] = useState('');
    const [TABLES, setTables] = useState({});

    useEffect(() => {
        fetchToTables(setTables)
    }, []);

    const handleStatusChange = async (itemIdx, newStatus) => {
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
                <h1>Kitchen View</h1>
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
                <Row className="table-container">
                    <Container className="table-info-container mb-3">
                        <h2 className="mb-3">{selectedTable}</h2>
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
                        {TABLES[selectedTable].tab.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.status}</td>
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

export default KitchenView;
