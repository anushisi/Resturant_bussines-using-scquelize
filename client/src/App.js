
import "./App.css";
import React, { useState, useEffect } from "react";
import Addrestraunt from "./Pages/Addrestraunt";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
} from "@mui/material";

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(4);
  const [editFormData, setEditFormData] = useState({
    editName: "",
    editMobile: "",
    editAddress: "",
    editImageUrl: "",
  });

  const handleShowMoreClick = () => {
    setDisplayedItems((prevCount) => prevCount + 4);
  };

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:8080/restaurants");
      console.log("this is",response);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  console.log("out side",restaurants)

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const addRestaurant = async (formData) => {
    try {
      await axios.post("http://localhost:8080/restaurants", formData);
      fetchRestaurants();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  const handleEditClick = (restaurant) => {
    setEditForm(true);
    setSelectedRestaurant(restaurant);
    setEditFormData({
      editName: restaurant.name,
      editMobile: restaurant.contactNumber,
      editAddress: restaurant.address,
      editImageUrl: restaurant.imageUrl,
    });
  };

  const handleEditFormSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:8000/restaurants/${selectedRestaurant.id}`,
        {
          name: editFormData.editName,
          contactNumber: editFormData.editMobile,
          address: editFormData.editAddress,
          imageUrl: editFormData.editImageUrl,
        }
      );
      setEditForm(false);
      fetchRestaurants();
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleDeleteClick = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:8080/restaurants/${restaurantId}`);
      fetchRestaurants();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <div className="App">
      <Typography variant="h1">All restaurant here</Typography>
      <Button onClick={() => setShowForm(!showForm)} className="btn01">
        Add Restaurant
      </Button>
      {showForm && <Addrestraunt addRestaurant={addRestaurant} />}
      <div className="RestaurantList">
        {restaurants.slice(0, displayedItems).map((restaurant) => (
          <Card key={restaurant.id} className="RestaurantBox">
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="RestaurantImage"
            />
            <CardContent>
              <Typography variant="h2">{restaurant.name}</Typography>
              <Typography>Mobile: {restaurant.contactNumber}</Typography>
              <Typography>Address: {restaurant.address}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => handleEditClick(restaurant)}
                variant="contained"
                className="edit-btn"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteClick(restaurant.id)}
                variant="contained"
                className="del-btn"
              >
                Delete
              </Button>
            </CardActions>
            {editForm && selectedRestaurant === restaurant && (
              <div className="EditForm">
                <form onSubmit={(e) => e.preventDefault()}>
                  <TextField
                    label="Name of the Restaurant"
                    variant="outlined"
                    fullWidth
                    name="editName"
                    value={editFormData.editName}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        editName: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    label="Contact Number"
                    variant="outlined"
                    fullWidth
                    name="editMobile"
                    value={editFormData.editMobile}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        editMobile: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    label="Your address"
                    variant="outlined"
                    fullWidth
                    name="editAddress"
                    value={editFormData.editAddress}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        editAddress: e.target.value,
                      })
                    }
                    required
                  />
                  <TextField
                    label="URL of the image"
                    variant="outlined"
                    fullWidth
                    name="editImageUrl"
                    value={editFormData.editImageUrl}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        editImageUrl: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    onClick={handleEditFormSubmit}
                    variant="contained"
                    className="edit-btn"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            )}
          </Card>
        ))}
      </div>
      {restaurants.length > displayedItems && (
        <div className="ShowMoreButtonContainer">
          <Button
            variant="contained"
            className="ShowMoreButton"
            onClick={handleShowMoreClick}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;

