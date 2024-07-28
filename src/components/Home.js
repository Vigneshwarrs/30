import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {API} from '../global';
import UserCard from './UserCard';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import {TextField} from '@mui/material';
import Modal from '@mui/material/Modal';

function Home() {

    const [userList, setUserList] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [street, setStreet] = useState("");
    const [suite, setSuite] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");  
    const [latitude, setLatitude] = useState("");
    const [logitude, setLongitude] = useState(""); 
    const [companyName, setCompanyName] = useState(""); 
    const [catchPhrase, setCatchPhrase] = useState("");
    const [bs, setBs] = useState("");
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    useEffect(()=>{
        async function fetchUser(){
            try{
                const {data} = await axios.get(API);
                setUserList(data);
            }catch(err){
                console.log("Error"+err);
            }
        }
        fetchUser();
    },[userList]);

    async function handleAdd() {
        const user = {name, username, email, address:{street,suite,city,zipcode,geo:{lat:latitude,lng:logitude}}, phone, website:website, company:{name: companyName, catchPhrase,bs}}
        const res = await axios.post(API, JSON.stringify(user),{
            headers: {'Content-Type':'application/json'}
        });
        console.log(res);
        setOpen(false);
    }



  return (
    <div>
        <div className='nav'>
        <Button variant='contained' onClick={()=>setOpen(true)} startIcon={<AddCircleIcon />}>Add User</Button>
        </div>
        <div className='cards'>
        {
            userList.map((user)=>(<UserCard key={user.id} user={user} />))
        }
        </div>
        {
            open ?<Modal open={open} onClose={()=>setOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
            <TextField style={{width:"400px", margin:'5px'}} id="name" label="Name" variant="outlined" value={name} onChange={(e)=>setName(e.target.value)} />
            <TextField style={{width:"400px", margin:'5px'}} id="username" label="Username" variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <TextField style={{width:"400px", margin:'5px'}} id="email" label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="street" label="Street" variant="outlined" value={street} onChange={(e)=>setStreet(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="suite" label="Suite" variant="outlined" value={suite} onChange={(e)=>setSuite(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="city" label="City" variant="outlined" value={city} onChange={(e)=>setCity(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="zipcode" label="Zipcode" variant="outlined" value={zipcode} onChange={(e)=>setZipcode(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="lat" label="latitude" variant="outlined" value={latitude} onChange={(e)=>setLatitude(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="log" label="logitude" variant="outlined" value={logitude} onChange={(e)=>setLongitude(e.target.value)} />
            <TextField style={{width:"400px", margin:'5px'}} id="phone" label="Phone" variant="outlined" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            <TextField style={{width:"400px", margin:'5px'}} id="website" label="Website" variant="outlined" value={website} onChange={(e)=>setWebsite(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="companyName" label="Name" variant="outlined" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} />
            <TextField style={{width:"170px", margin:'5px'}} id="catchPhrase" label="CatchPhrase" variant="outlined" value={catchPhrase} onChange={(e)=>setCatchPhrase(e.target.value)} />
            <TextField style={{width:"100px", margin:'5px'}} id="bs" label="BS" variant="outlined" value={bs} onChange={(e)=>setBs(e.target.value)} />
            <Button style={{width:"400px", margin:'5px'}} onClick={()=>handleAdd()} variant='contained'>Add User</Button>
            </Box>
          </Modal> :''
        }
    </div>
  )
}

export default Home