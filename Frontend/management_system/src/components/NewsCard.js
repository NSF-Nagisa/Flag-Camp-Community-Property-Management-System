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
    width: '400px', // Set the width as desired
    height: '400px', // Set the height as desired
    margin: '20px',
  };

  return (
    <Card style={cardStyles}>
      <Card.Body>
        <Card.Title>Title: {news.title}</Card.Title>
        <Card.Text>Description: {news.description}</Card.Text>
        <Card.Text>Date: {news.date}</Card.Text>
        <Card.Text>ID: {news.id}</Card.Text>
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
        <Modal.Header closeButton>
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
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={formData.date}
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