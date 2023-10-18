import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function AddItemModal({ show, onHide, onAdd, selectedTab }) {
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemDate, setItemDate] = useState('');
  const [itemTime, setItemTime] = useState('');
  const [itemLocation, setItemLocation] = useState('');


  const handleAddItem = () => {
    // Check if all required fields are filled
    if (itemTitle && itemDescription && itemDate) {
      const newItem = {
        type: selectedTab,
        id: Date.now(), 
        title: itemTitle,
        description: itemDescription,
        date: itemDate,
      
      };

      if (selectedTab === 'events' || selectedTab === 'alerts') {
        newItem.time = itemTime;
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
      setItemLocation('')
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
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
        
          <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={itemDate}
                onChange={(e) => setItemDate(e.target.value)}
              />
          </Form.Group>

          {(selectedTab === 'events' || selectedTab === 'alerts') && (
            <>
              <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={itemTime}
                  onChange={(e) => setItemTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="location"
                  value={itemLocation}
                  onChange={(e) => setItemLocation(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          
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
