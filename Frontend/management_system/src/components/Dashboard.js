import React, { useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import EventCard from "./EventCard";
import AlertCard from "./AlertCard";
import NewsCard from "./NewsCard";
import PolicyCard from "./PolicyCard";
import AddItemModal from "./AddItemModal";
import { Role } from "../constants/Role"; // Import the roles
import { useSelector } from "react-redux";

// add initial mock data
var initialData = [
  {
    id: 1,
    type: "events",
    title: "Monthly Maintenance Meeting",
    description:
      'Discuss maintenance tasks, repairs, and vendor updates for the month of November.',
    date: "2023-11-01",
    time: "10:00 AM",
    location: "Property Management Office",
  },
  {
    id: 2,
    type: "alerts",
    title: "Emergency Maintenance Alert",
    description:
      "Urgent repair required for a water leak in Building A. Maintenance team dispatched.",
    date: "2023-10-18",
    time: "9:30 AM",
    location: "Building A, Unit 203",
  },

  {
    id: 3,
    type: "news",
    title: "New Property Management Officer",
    description:
      "We have a new property management manager Kevin Dart joining this month",
    date: "2023-10-19",
  },
  {
    id: 4,
    type: "policies",
    title: "Community Management Policy",
    description: `
    1. Introduction
      The Flag Community Management Policy outlines the rules and guidelines governing the management and maintenance of our community. 
      This policy is designed to ensure a safe, harmonious, and well-maintained environment for all residents and visitors.
    
    2. Responsibilities of the Homeowner's Association (HOA)
      The HOA is responsible for:
        - Administering and enforcing community rules and regulations.
        - Collecting dues and managing the community budget.
        - Maintaining common areas, landscaping, and community facilities.
        - Organizing community events and activities.
    
    3. Property Maintenance
      Homeowners are responsible for the upkeep and maintenance of their individual properties, including:
        - Lawn and garden maintenance.
        - Exterior paint and repairs.
        - Compliance with architectural guidelines for renovations and improvements.
    
    4. Community Rules and Regulations
      All residents are expected to adhere to the community's rules and regulations, which include:
        - Noise restrictions during quiet hours.
        - Proper waste disposal and recycling.
        - Pet policies.
        - Parking rules and visitor regulations.
    
    5. Architectural Control
      Homeowners planning exterior modifications or additions must obtain approval from the HOA Architectural Committee before commencing any work. 
      This includes:
        - Changes to building exteriors.
        - Fencing and landscaping alterations.
        - Installation of satellite dishes or antennas.
    
    6. Payment of Dues
      Homeowners are required to pay HOA dues promptly to ensure the proper functioning of the community. 
      Failure to do so may result in fines or other penalties.
    
    7. Dispute Resolution
      In the event of disputes between residents or between residents and the HOA, a structured dispute resolution process will be followed 
      to resolve issues amicably.
    
    8. Community Security
      The community will implement security measures to safeguard residents and property, 
      which may include gate access controls and surveillance systems.
    
    9. Community Amenities
      Residents are encouraged to utilize and respect community amenities, such as parks, pools, and recreational areas. 
      Rules for their use will be posted and enforced.
    
    10. Communication
      The HOA will maintain open lines of communication with residents through regular newsletters, community meetings, and the community 
      management system website.
    `,
    date: "2023-10-20",
  },
  {
    id: 5,
    type: "alerts",
    title: "Reminder - Pet Leash Rule",
    description: `Friendly reminder to all pet owners in the community: Please keep your pets on a leash when in common areas and clean up after them. Let's keep our community clean and safe for everyone.`,
    date: "2023-09-04",
    time: "10:30 AM",
  },
  {
    id: 6,
    type: "alerts",
    title: "Trash Collection Alert",
    description:
      "Due to the upcoming holiday on Labor Day, trash collection will be rescheduled. Please refer to the holiday schedule for collection dates.",
    date: "2023-09-04",
    time: "12:30 PM",
  },
  {
    id: 7,
    type: "events",
    title: "Community Yard Sale",
    description: `Clean out your closets and join our community yard sale! Reserve your spot and sell your items. It's a great opportunity to declutter and socialize with neighbors.`,
    date: "2023-10-04",
    time: "15:00 PM",
  },
  {
    id: 8,
    type: "events",
    title: "Family Movie Night",
    description: `Bring your blankets and chairs for a fun family movie night under the stars. We'll be showing [Movie Title]. Popcorn and drinks will be provided.`,
    date: "2023-09-27",
    time: "19:00 PM",
  },
  {
    id: 9,
    type: "events",
    title: "Annual HOA Meeting",
    description: `Our annual Homeowner's Association meeting is an opportunity to discuss community matters, review the budget, and elect board members. Your participation is crucial in shaping our community's future.`,
    date: "2023-09-27",
    time: "19:00 PM",
  },
];

function Dashboard() {
  const [items, setItems] = useState(initialData);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState("events"); // Default to 'events'
  const user = useSelector((state) => state.isLoggedIn.user);

  // Function to add a new item
  const addItem = (newItem) => {
    if (user.role === Role.HOA) {
      setItems([...items, newItem]);
      initialData.push(newItem);
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
      initialData = initialData.map((item) =>
        item.id === itemId ? { ...item, ...updatedData } : item
      );
    }
  };

  // Function to delete an item by ID
  const deleteItem = (itemId) => {
    if (user.role === Role.HOA) {
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
      initialData = initialData.filter((obj) => obj.id != itemId);
    }
  };

  // Render item cards based on the selected tab
  const renderItems = () => {
    try {
      return items
        .filter((item) => item.type === selectedTab)
        .map((item, index) => {
          switch (item.type) {
            case "events":
              return (
                <EventCard
                  key={item.id}
                  event={item}
                  onDelete={deleteItem}
                  onUpdate={updateItem}
                />
              );
            case "alerts":
              return (
                <AlertCard
                  key={item.id}
                  alert={item}
                  onDelete={deleteItem}
                  onUpdate={updateItem}
                />
              );
            case "news":
              return (
                <NewsCard
                  key={item.id}
                  news={item}
                  onDelete={deleteItem}
                  onUpdate={updateItem}
                />
              );
            case "policies":
              return (
                <PolicyCard
                  key={item.id}
                  policy={item}
                  onDelete={deleteItem}
                  onUpdate={updateItem}
                />
              );
            default:
              return null;
          }
        });
    } catch (error) {
      console.error("Error rendering Card:", error);
      return null;
    }
  };

  const addButtonStyles = {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "20%",
  };

  const navbarStyles = {
    display: "flex",
    justifyContent: "center",
    marginRight: "30rem",
  };
  const linkStyles = {
    marginLeft: "10rem",
    fontWeight: "bold",
  };
  return (
    <div>
      {/* Navigation Bar */}
      <Row>
        <Col>
          <Navbar bg="light" expand="lg" data-bs-theme="dark">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" style={navbarStyles}>
                <Nav className="me-auto">
                  <Nav.Link
                    style={linkStyles}
                    onClick={() => setSelectedTab("events")}
                  >
                    Events
                  </Nav.Link>
                  <Nav.Link
                    style={linkStyles}
                    onClick={() => setSelectedTab("alerts")}
                  >
                    Alerts
                  </Nav.Link>
                  <Nav.Link
                    style={linkStyles}
                    onClick={() => setSelectedTab("news")}
                  >
                    News
                  </Nav.Link>
                  <Nav.Link
                    style={linkStyles}
                    onClick={() => setSelectedTab("policies")}
                  >
                    Policies
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col md={2}>{/* Sidebar or other content */}</Col>
        <Col md={9}>
          <Row style={addButtonStyles}>
            {/* Add Item Button */}
            {user.role === Role.HOA && (
              <Button onClick={() => setShowAddItemModal(true)}>
                Add {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
              </Button>
            )}
          </Row>
          <Row>{renderItems()}</Row>
        </Col>
      </Row>

      {/* Add Item Modal */}
      <AddItemModal
        show={showAddItemModal}
        setShowAddItemModal={setShowAddItemModal}
        onAdd={addItem}
        selectedTab={selectedTab}
      />
    </div>
  );
}

export default Dashboard;
