import './customerView.css';
import { Container, Form, Table } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { MENU } from '../../data/menu';
import { fetchToTables, pushTableToFirebase } from '../../backend/firestore';


function CustomerView() {
  const [selectedTable, setSelectedTable] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showAddedItems, setShowAddedItems] = useState(false);
  const [selectedTableTab, setSelectedTableTab] = useState([]);

  const [TABLES, setTables] = useState({});

  useEffect(() => {
    fetchToTables(setTables)
  }, []);

  useEffect(() => {
    console.log(selectedTable);
  }, [selectedTable])

  const handleViewMenu = () => {
    setShowMenu(true);
  };
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handlePay = () => {
    setShowAddedItems(true);
  };

  const handleCloseAddedItems = () => {
    setShowAddedItems(false);
  };

  const handleCallWaiter = () => {
    // get a reference to the selected table in Firebase
    const selectedTableRef = TABLES[selectedTable];
    
    // update the needsHelp field to true
    selectedTableRef.needsHelp = true;

    pushTableToFirebase(selectedTableRef).then(() => {
      fetchToTables(setTables);
      alert('Waiter has been called! They should be arriving in a minute:)')
    });

    

  };
  

  return (
    <Container className='customer-main-container'>
      <Row className='fixed-top customer-topbar'>
        <h1>TableTab -- Customer</h1>
      </Row>

      {/* Customer chooses tables before using the rest of the menu */}
      <Row className='customer-content-container mb-3'>
          <Row className="content-container mb-3">
            <h3>Get a table from below:</h3>
            <Form.Select aria-label="Default select example"
                key={selectedTable}
                value={selectedTable}
                onChange={(e) => {
                    e.preventDefault();
                    setSelectedTable(e.target.value)
                    setSelectedTableTab(TABLES[e.target.value].tab)
                }}>
                <option>Select table</option>
                {Object.keys(TABLES).sort().map((tableName, idx) => {
                    return <option value={tableName} key={idx} style={ TABLES[tableName].needsHelp? {backgroundColor: "red"}:{}}>{tableName}</option>
                })}
            </Form.Select>
          </Row>

        {selectedTable !== '' && (
          <>
          <Row className='mt-3 justify-content-center'>
            <Col className='text-center'>
              <Button className='w-100' variant='primary' onClick={handleViewMenu}>View Menu</Button>
            </Col>
          </Row>
          <Row className='mt-3 justify-content-center'>
            <Col className='text-center'>
              <Button className='w-100' variant='primary' onClick={handlePay}>Pay</Button>
            </Col>
          </Row>
          <Row className='mt-3 justify-content-center'>
            <Col className='text-center'>
              <Button className='w-100' variant='primary' onClick={handleCallWaiter}>Call Waiter</Button>
            </Col>
          </Row>
          </> 
        )}
      </Row>

      {/* Displays the restaurant's menu */}
      <Modal show={showMenu} onHide={handleCloseMenu}>
        <Modal.Header closeButton>
          <h2>Menu</h2>
        </Modal.Header>
        <Modal.Body>
          {/* Show menu */}
          <ul>
            {MENU.map((food) => (
              <li key={food.id}>
                <h3>{food.name}</h3>
                <p>Price: ${food.price}</p>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMenu}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Displays selected table's tab */}
      <Modal show={showAddedItems} onHide={handleCloseAddedItems}>
        <Modal.Header closeButton>
          <h2>Tab</h2>
        </Modal.Header>
        <Modal.Body>
          {selectedTableTab.length > 0 && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedTableTab.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            )}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {}}>
            Pay All
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Split Bill
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default CustomerView;
