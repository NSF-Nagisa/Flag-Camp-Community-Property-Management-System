import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { useSelector } from "react-redux";

function NewsCard({ news, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ...news });
  const user = useSelector(state => state.isLoggedIn.user);

  const handleDelete = () => {
    onDelete(news.id);
  };

  const handleUpdate = () => {
    setFormData({...news});
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
     onUpdate(news.id, formData);

     // Close the modal
     setShowModal(false);
  };
  
  // Define custom styles for the Card component
  const cardStyles = {
    width: '80%', // Set the width as desired
    height: 'auto', // Set the height as desired
    margin: '20px',
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
        <Card.Title>{news.title}</Card.Title>
        <Card.Text>{news.description}</Card.Text>
        <footer className="blockquote-footer" style={timeStyles}>{news.date}</footer>
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
        <Modal.Header>
          <Modal.Title>Edit Event</Modal.Title>
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

export default NewsCard;