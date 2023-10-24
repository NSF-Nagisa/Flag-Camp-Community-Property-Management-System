import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AddItemModal({ show, onAdd, selectedTab, setShowAddItemModal}) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemDate, setItemDate] = useState(now.getFullYear() + '-' + month + '-' + now.getDate());
  const [itemTime, setItemTime] = useState(now.getHours() + ':' + now.getMinutes());
  const [itemLocation, setItemLocation] = useState('');


  const handleAddItem = () => {
    // Check if all required fields are filled
    if (itemTitle && itemDescription) {
      const newItem = {
        type: selectedTab,
        id: Date.now(), 
        title: itemTitle,
        description: itemDescription,
        date: now.getFullYear() + '-' + month + '-' + now.getDate(),
      
      };

      if (selectedTab === 'events' || selectedTab === 'alerts') {
        newItem.time = now.getHours() + ':' + now.getMinutes();
        newItem.location = itemLocation;
      }

      onAdd(newItem);
      // Close the modal
      onHide();

      // Clear input fields
      setItemTitle('');
      setItemDescription('');
      setItemDate('');
      setItemTime('');
    }
  };
  const onHide = () => {
    setItemTitle('');
    setItemDescription('');
    setItemDate('');
    setItemTime('');
    setShowAddItemModal(false);
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header >
        <Modal.Title>Add {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${selectedTab} Title`}
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={`Enter ${selectedTab} Description`}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddItem}>
          Add {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItemModal;