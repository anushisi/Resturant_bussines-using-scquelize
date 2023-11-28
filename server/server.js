const express = require('express');
/* database */
const sequelize = require('./db/dbconfig.js');
// const User = require('./models/User.js'); /* isko hta do toh kaam krega */
const cors = require('cors');
const app = express();
const Restaurant=require('./models/User.js');

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 8080;

// sequelize.sync().then((result)=>{
//   console.log(result);
// }).then((error)=>{
//   console.log(error);
// })
sequelize.sync({ force: true }).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
sequelize
.authenticate()
.then(() => {
  console.log('Connection established successfully');
})
.catch((error) => {
  console.error('Error in establishing connection:', error);
});


/**post */
app.post("/restaurants", async (req, res) => {
  try {
    const { name, imageUrl, address, contactNumber } = req.body;

    // Using Sequelize to create a new restaurant
    const newRestaurant = await Restaurant.create({
      name,
      imageUrl,
      address,
      contactNumber,
    });

    console.log("Restaurant added successfully");
    res.status(201).json({ result: newRestaurant });
  } catch (err) {
    console.error("Error adding restaurant:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
/** get***/ 
// app.get("/restaurants", async (req, res) => {
//   try {
//     // Using Sequelize to find all restaurants
//     const restaurants = await User.findAll();
//     console.log(restaurants);
//    res.status(200).json(restaurants);
//   } catch (err) {
//     console.error("Error querying restaurants:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/restaurants", async (req, res) => {
  try {
    // Using Sequelize to find all restaurants
    const restaurants = await Restaurant.findAll().catch((error) => console.error("Error querying restaurants:", error));// Use User instead of Restaurant
    console.log(restaurants);
    res.status(200).json(restaurants);
  } catch (err) {
    console.error("Error querying restaurants:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**update */
app.put("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const { name, imageUrl, address, contactNumber } = req.body;

  try {
    // Using Sequelize to find the restaurant by ID
    const restaurant = await User.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Using Sequelize to update the restaurant
    await restaurant.update({
      name,
      imageUrl,
      address,
      contactNumber,
    });

    console.log("Restaurant updated successfully");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error updating restaurant:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* delete request */
app.delete("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;

  try {
    // Using Sequelize to find the restaurant by ID
    const restaurant = await User.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Using Sequelize to delete the restaurant
    await restaurant.destroy();

    console.log("Restaurant deleted successfully");
    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting restaurant:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



/* Server */


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
