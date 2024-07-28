import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { API } from "../global";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

export default function UserCard({ user }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [website, setWebsite] = useState(user.website);
  const [street, setStreet] = useState(user.address?.street || "");
  const [suite, setSuite] = useState(user.address?.suite|| "");
  const [city, setCity] = useState(user.address?.city|| "");
  const [zipcode, setZipcode] = useState(user.address?.zipcode|| "");
  const [latitude, setLatitude] = useState(user.address?.geo?.lat || "");
  const [longitude, setLongitude] = useState(user.address?.geo?.lng || "");
  const [companyName, setCompanyName] = useState(user.company?.name || "");
  const [catchPhrase, setCatchPhrase] = useState(user.company?.catchPhrase || "");
  const [bs, setBs] = useState(user.company?.bs || "");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  async function handleEdit() {
    const updatedUser = {
      name: name,
      username: username,
      email: email,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
        geo: {
          lat: latitude,
          lng: longitude
        }
      },
      phone: phone,
      website: website,
      company: {
        name: companyName,
        catchPhrase: catchPhrase,
        bs: bs
      },
    };
    const res = await axios.put(
      `${API}/${user.id}`,
      JSON.stringify(updatedUser),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res);
    setOpen(false);
  }

  return (
    <Card sx={{ maxWidth: 355 }} className="card">
      <CardContent>
        <Typography
          style={{ textAlign: "center" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          UserName: {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {user.address.street},{user.address.suite},
          {user.address.city},{user.address.zipcode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {user.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Website: {user.website}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Company: {user.company.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setOpen(true)}>
          Edit
        </Button>
        <Button
          size="small"
          onClick={async () => {
            await axios.delete(`${API}/${user.id}`);
          }}
        >
          Delete
        </Button>
      </CardActions>
      {open ? (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              style={{ width: "400px", margin: "5px" }}
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              style={{ width: "400px", margin: "5px" }}
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={{ width: "400px", margin: "5px" }}
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ width: "120px", margin: "5px" }}
              id="street"
              label="Street"
              variant="outlined"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <TextField
              style={{ width: "120px", margin: "5px" }}
              id="suite"
              label="Suite"
              variant="outlined"
              value={suite}
              onChange={(e) => setSuite(e.target.value)}
            />
            <TextField
              style={{ width: "120px", margin: "5px" }}
              id="city"
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              style={{ width: "120px", margin: "5px" }}
              id="zipcode"
              label="Zipcode"
              variant="outlined"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <TextField
              style={{ width: "120px", margin: "5px" }}
              id="lat"
              label="latitude"
              variant="outlined"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <TextField
              style={{ width: "120px", margin: "5px" }}
              id="log"
              label="longitude"
              variant="outlined"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
            <TextField
              style={{ width: "400px", margin: "5px" }}
              id="phone"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              style={{ width: "400px", margin: "5px" }}
              id="website"
              label="Website"
              variant="outlined"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              style={{ width: "100px", margin: "5px" }}
              id="companyName"
              label="Name"
              variant="outlined"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              style={{ width: "170px", margin: "5px" }}
              id="catchPhrase"
              label="CatchPhrase"
              variant="outlined"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
            />
            <TextField
              style={{ width: "100px", margin: "5px" }}
              id="bs"
              label="BS"
              variant="outlined"
              value={bs}
              onChange={(e) => setBs(e.target.value)}
            />
            <Button
              style={{ width: "400px", margin: "5px" }}
              onClick={handleEdit}
              variant="contained"
            >
              Update
            </Button>
          </Box>
        </Modal>
      ) : (
        ""
      )}
    </Card>
  );
}
