
import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


class FileUploadPage extends React.Component {
  
  state = {
    // Initially, no file is selected
    selectedFile: null,
    childData:null,
    msg: "",
  };

  // On file select (from the pop up)
  onFileChange = event => {
  
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  
  };
  
  // On file upload (click the upload button)
  onFileUpload = () => {
  
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
  
    // Details of the uploaded file
    console.log(this.state.selectedFile);
  
    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
    axios.put()
  };
  handleCallback = (childData) =>{
    alert(childData);
    this.setState({msg: childData,})
}
  
  // File content to be displayed after
  // file upload is complete
  fileData = () => {
  
    if (this.state.selectedFile) {
       
      return (
        <div>
            
            <h2>File Details:</h2>   
            <p>File Name: {this.state.selectedFile.name}</p>        
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  
  render() {
  
    return (
      <div>
          <div>
              <input type="file" onChange={this.onFileChange} accept="video/mp4,video/x-m4v,video/*" />
              <button onClick={this.onFileUpload}>
                Upload!
              </button>
          </div>
        {this.fileData()}
      </div>
    );
  }
}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.recievedUrl={}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onCallback = this._onCallback.bind(this);
  }


  handleCallback = (childData) =>{this.setState({msg: childData})}
  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    
    const loadPost = async () => {
      // Till the data is fetch using API 
      // the Loading page will show.
      // Await make wait until that 
      // promise settles and return its reult
      const response = await axios.post('https://livepeer.com/api/asset/request-upload', JSON.stringify({"name":this.state.value}), { headers: { "Authorization": "Bearer 799ec2b2-9108-434d-91ac-abec0b9b0f09","Content-Type":"application/json"} });
      // After fetching data stored it in posts state.
      console.log(response.data.url);
      // this.props.handleCallback(response.data.url);
      // navigate('/FileUploadPage');
      // Closed the loading page
      return this._onCallback(response.data.url);

    }
    loadPost();
    event.preventDefault();
  }
  
  _onCallback(String){
    console.log("ONCALLBACK  "+String);
    return <FileUploadPage value={String}/>;
  }
 
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          FileName :
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="Submit" />
      </form>
       <div>
         <p>summa</p>
           {this._onCallback}
       </div> 
       </div>
    );
  }
}


function App() {
  const [data, setData] = React.useState(null);
  // const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(String);
  // const [name,getName]= useState(String);
  // const navigate = useNavigate();

  React.useEffect(function () {
        fetch("/api")
        .then((res)=>res.json())
        .then((data) => setData(data.message));
    }, []); 
  

  return (
    <div className="App">
    <header >
      <img src={logo} className="App-logo" alt="logo" />
      <p>{!data ? "Loading..." : data}</p>
      <div>
        <h2>HI</h2>
        <NameForm></NameForm>
        
      </div>
      <div className="App">

      </div>
    </header>
    <body>
    <button>Increment</button>
    </body>
    
  </div>
  );
}


export default App;
