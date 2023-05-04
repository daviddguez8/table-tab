import {Container, Form, Row, Button, Table} from 'react-bootstrap';
import './KitchenView.css';
import {useEffect, useState} from 'react';
import {KITCHEN_STATUSES} from "../../data/statuses";
import {fetchToTables, pushTableToFirebase} from "../../backend/firestore";


// This is the kitchen view.
function KitchenView() {
    const [TABLES, setTables] = useState({});

    useEffect(() => {
        fetchToTables(setTables).then(r => console.log(r))
    }, []);

    const handleStatusChange = async (tableId, itemIdx, newStatus) => {
        const item = TABLES[tableId].tab[itemIdx];
        item.status = newStatus;
        TABLES[tableId].tab[itemIdx] = item;
        console.log("Status", newStatus)
        await pushTableToFirebase(TABLES[tableId]);
        await fetchToTables(setTables);
    }

    const handleItemReady = (tableId, index, item) => {
        console.log("Ready", tableId, index, item)
        // setTables((prev) => {
        //     const updatedTable = { ...prev[tableId]};
        //     updatedTable.tab.splice(index, 1);
        //     return { prev, [tableId]: updatedTable };
        // })};
    }

    return (
        <Container className="main-container">
            <Row className='fixed-top topbar'>
                <h1>Table Tab</h1>
            </Row>

            <Row className="content-container mb-3">
                <h2>Kitchen View</h2>
            </Row>

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
                                                    onClick={() => handleItemReady(tableId, index, item)}>
                                                Item is Ready
                                            </Button>
                                        ) : <span>Cooking...</span>}
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
