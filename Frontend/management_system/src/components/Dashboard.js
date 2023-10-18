import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import EventCard from './EventCard';
import AlertCard from './AlertCard';
import NewsCard from './NewsCard';
import PolicyCard from './PolicyCard';
import AddItemModal from './AddItemModal';
import { Role } from '../constants/Role'; // Import the roles
import { useSelector } from "react-redux";

function Dashboard() {
  // add initial mock data
  const initialData = [
    {
      id: 1,
      type: 'events',
      title: 'Monthly Maintenance Meeting',
      description: 'Discuss maintenance tasks, repairs, and vendor updates for the month of November.',
      date: '2023-11-01',
      time: '10:00 AM - 12:00 PM',
      location: 'Property Management Office',
      
    },
    {
      id: 2,
      type: 'alerts',
      title: 'Emergency Maintenance Alert',
      description: 'Urgent repair required for a water leak in Building A. Maintenance team dispatched.',
      date: '2023-10-18',
      time: '09:30 AM',
      location: 'Building A, Unit 203',
    },

    {
      id: 3,
      type: 'news',
      title: 'New Property Management Officer',
      description: 'We have a new property management manager Kevin Dart joining this month',
      date: '2023-10-19',
    },
    {
      id: 4,
      type: 'policies',
      title: 'Tenant Rental Policy',
      description: 'Guidelines and regulations for tenants regarding rent payments, lease terms, and responsibilities. web link is www.property.com/policy',
      date: '2023-10-20',
    },
  ];
  const [items, setItems] = useState(initialData);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState('events'); // Default to 'events'
  const user = useSelector(state => state.isLoggedIn.user);
  // Define state for capturing item details
  //const [itemType, setItemType] = useState('events');
  //const [itemTitle, setItemTitle] = useState('');
  //const [itemDescription, setItemDescription] = useState('');
  //const [itemDate, setItemDate] = useState('');
  //const user = useSelector((state)=> state.isloggedIn.user);
  // Function to add a new item
  console.log("User:", user);
  const addItem = (newItem) => {
    if (user.role === Role.HOA) {
      setItems([...items, newItem]);
    }     
    
  };

  const updateItem = (itemId, updatedData) => {
    // Find the event by its ID and update it
    if (user.role === Role.HOA) {
       const updatedItems = items.map((item) =>
          item.id === itemId ? { ...item, ...updatedData } : item
       );
  
       // Update the state with the new event data
       setItems(updatedItems);
    }
  }
  

  // Function to delete an item by ID
  const deleteItem = (itemId) => {
    if (user.role === Role.HOA) {
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
    }
  };

 

  // Render item cards based on the selected tab
  const renderItems = () => {
    console.log('Rendering items:', items, selectedTab);
    try{
      return items
      .filter(item => item.type === selectedTab)
      .map((item, index) => {
        switch (item.type) {
          case 'events':
            return <EventCard  key={item.id} event={item} onDelete={deleteItem} onUpdate={updateItem} />;
          case 'alerts':
            return <AlertCard  key={item.id} alert={item} onDelete={deleteItem} onUpdate={updateItem} />;
          case 'news':
            return <NewsCard key={item.id} news={item} onDelete={deleteItem} onUpdate={updateItem} />;
          case 'policies':
            return <PolicyCard key={item.id} policy={item} onDelete={deleteItem} onUpdate={updateItem} />;
          default:
            return null;
        }
      });



    } catch (error) {
      console.error("Error rendering Card:", error);
      return null;
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Community Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => setSelectedTab('events')}>events</Nav.Link>
              <Nav.Link onClick={() => setSelectedTab('alerts')}>alerts</Nav.Link>
              <Nav.Link onClick={() => setSelectedTab('news')}>news</Nav.Link>
              <Nav.Link onClick={() => setSelectedTab('policies')}>policies</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container>
        <Row>
          <Col md={3}>{/* Sidebar or other content */}</Col>
          <Col md={9}>
            {/* Add Item Button */}
            {user.role === Role.HOA && (
              <Button onClick={() => setShowAddItemModal(true)}>
                 Add {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
              </Button>
             )}
            {/* Item Cards */}
            <h2>{selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</h2>
            
            <Row>
              {renderItems()}

            </Row>
          </Col>
        </Row>
      </Container>

      {/* Add Item Modal */}
      <AddItemModal
        show={showAddItemModal}
        onHide={() => setShowAddItemModal(false)}
        onAdd={addItem}
        selectedTab={selectedTab}
       
      />
    </div>
  );
}

export default Dashboard;

