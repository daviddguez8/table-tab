import { Container, Form, Row, Col, Button, Table } from 'react-bootstrap';
import './KitchenView.css';
import { useEffect, useState } from 'react';

import { KITCHEN_STATUSES, STATUSES } from "../../data/statuses";
import { fetchToTables, pushTableToFirebase } from "../../backend/firestore";


// This is the kitchen view.
function KitchenView() {
    const [TABLES, setTables] = useState({});

    useEffect(() => {
        fetchToTables(setTables);
    }, []);


    const handleStatusChange = async (tableId, itemIdx, newStatus) => {
        const item = TABLES[tableId].tab[itemIdx];
        item.status = newStatus;
        TABLES[tableId].tab[itemIdx] = item;
        await pushTableToFirebase(TABLES[tableId]);
        await fetchToTables(setTables);
    }

    const filterItems = (status) => {
        let result = [];

        Object.keys(TABLES).forEach((tableId) => {
            const table = TABLES[tableId];
            table.tab.forEach((item, index) => {
                if (item.status === status) {
                    const filteredItem = {
                        table: tableId,
                        name: item.name,
                        quantity: item.quantity,
                        status: item.status,
                        index: index
                    }

                    result = [...result, filteredItem]
                }
            });
        });
        return result;
    }


    return (
        <Container className="main-container">
            <Row className='fixed-top topbar '>
                <h1>Table Tab</h1>
            </Row>

            <Row className="content-container mb-3">
                <h2>Kitchen View</h2>
            </Row>

            <Container className="table-container">

                <Col className='queue-container p-3'>

                    <Container className="table-info-container mb-3">
                        <h3 className="mb-3">Queue</h3>
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
                            {filterItems(STATUSES.ORDERED).map((item, index) => {
                                console.log(item);
                                return (
                                    <tr key={`${item.table}-${item.index}`}>
                                        <td>{item.table}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {item.status}
                                        </td>
                                        <td>
                                            <Button className='w-100' variant='primary'
                                                onClick={() => { handleStatusChange(item.table, item.index, KITCHEN_STATUSES.COOKING) }}>
                                                Start Cooking
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>

                <Col className='p-3'>
                    <Container className="table-info-container mb-3">
                        <h3 className="mb-3">In Kitchen</h3>
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
                            {filterItems(KITCHEN_STATUSES.COOKING).map((item, index) => {
                                console.log(item);
                                return (
                                    <tr key={`${item.table}-${item.index}`}>
                                        <td>{item.table}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            {item.status}
                                        </td>
                                        <td>
                                            <Button className='w-100' variant='primary'
                                                onClick={() => {handleStatusChange(item.table, item.index, KITCHEN_STATUSES.COOKED) }}>
                                                Item Ready
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>


            </Container>
        </Container>
    );
}

export default KitchenView;
