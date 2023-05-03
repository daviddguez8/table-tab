import './customerView.css';
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

import { useState } from 'react';
import { MENU } from '../../data/menu';


function CustomerView() {
  const [showMenu, setShowMenu] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [showAddedItems, setShowAddedItems] = useState(false);

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
  const handleAddItem = (item) => {
    setAddedItems([...addedItems, item]);
  };

  return (
    <Container className='customer-main-container'>
      <Row className='fixed-top customer-topbar'>
        <h1>Customer View</h1>
      </Row>

      {/* Buttons Container */}
      <Row className='customer-content-container mb-3'>
        <Row className='mt-5 justify-content-center'>
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
            <Button className='w-100' variant='primary'>Call Waiter</Button>
          </Col>
        </Row>
      </Row>

      {/* Menu Modal */}
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

      {/* Tab Modal */}
      <Modal show={showAddedItems} onHide={handleCloseAddedItems}>
        <Modal.Header closeButton>
          <h2>Tab</h2>
        </Modal.Header>
        <Modal.Body>
          {/* Shows tab */}
          <ul>
            {addedItems.map((item, index) => (
              <li key={index}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </li>
            ))}
          </ul>
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
