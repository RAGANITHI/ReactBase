const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const axios = require('axios');

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/request-upload",(req,res)=>{
    var data=makeGetRequest();
    res.json({message:data})
});
  

async function makeGetRequest() {
  console.log("INHERE");
  try {
    let res = await axios.post('https://livepeer.com/api/asset/request-upload', JSON.stringify({"name":"Example"}), { headers: { "Authorization": "Bearer 799ec2b2-9108-434d-91ac-abec0b9b0f09","Content-Type":"application/json"} });

  let data = res.data;
  // console.log(data);
  return data;
  } catch (error) {
    console.log(error)
    return error;
  }
 
}

// makeGetRequest();






















app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});