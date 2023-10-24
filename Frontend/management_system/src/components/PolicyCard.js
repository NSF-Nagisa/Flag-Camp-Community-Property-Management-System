import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from "react-redux";

function PolicyCard({ policy, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ...policy });
  const user = useSelector(state => state.isLoggedIn.user);

  const handleDelete = () => {
    onDelete(policy.id);
  };

  const handleUpdate = () => {
    setFormData({...policy});
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmUpdate = () => {
    // Call the onUpdate function with the event ID and updated formData
     onUpdate(policy.id, formData);

     // Close the modal
     setShowModal(false);
  };
  
  // Define custom styles for the Card component
  const cardStyles = {
    width: '80%', // Set the width as desired
    height: 'auto', // Set the height as desired
    margin: '20px',
    whiteSpace: 'pre-wrap',
  };

  const timeStyles = { 
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'flex-end',
    color: 'darkgray'
  }

  return (
    <Card style={cardStyles}>
      <Card.Body>
        <Card.Title>{policy.title}</Card.Title>
        {/* <Card.Text>{policy.description}</Card.Text> */}
        <p>
          {policy.description}
        </p>
        
        <footer className="blockquote-footer" style={timeStyles}>{policy.date}</footer>
      </Card.Body>
      
      {/* Add the "Delete" and "Update" buttons here */}
      {user.role === 'HOA' && (
        <Card.Footer className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleDelete}>
             Delete
          </Button>

          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Card.Footer>
       )}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header >
          <Modal.Title>Edit Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default PolicyCard;





