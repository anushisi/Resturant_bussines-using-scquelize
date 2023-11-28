import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
  },
  inputContainer: {
    margin: theme.spacing(1),
  },
  btn: {
    marginTop: theme.spacing(2),
  },
}));

const AddRestaurant = ({ addRestaurant }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRestaurant(formData);
    setFormData({ name: "", address: "", contactNumber: "", imageUrl: "" });
  };

  return (
    <Paper elevation={3} className={classes.form}>
      <Typography variant="h5">Add Restaurant</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.inputContainer}>
            <TextField
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField
              label="Address"
              variant="outlined"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField
              label="Contact Number"
              variant="outlined"
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item className={classes.inputContainer}>
            <TextField
              label="Image URL"
              variant="outlined"
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item className={classes.btn}>
            <Button variant="contained" color="primary" type="submit">
              Add Restaurant
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddRestaurant;
