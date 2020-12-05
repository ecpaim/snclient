import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

axios.defaults.baseURL = "http://localhost:3001";

function App() {

  const handleImageChange = (event) => {

    const image = event.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append('image', image, image.name);

    console.log('formdata: ');
    console.log(formData);

    axios.post('/api/upimg', formData)
        .then((res) => {
          console.log(res);
        })
        .catch(err => console.log(err));
  };

  const handleEditPicture = () => {
    
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
    

    // axios.get('/api/').then( res => {
    //   console.log('success');
    //   console.log(res.data);
    // })

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. hmmmmmmmmmmmmmmmm
        </p>
       
        <input type='file' id='imageInput' onChange={handleImageChange} hidden='hidden'/>
        <Button 
          tip='Edit profile picture' 
          onClick={handleEditPicture} 
          >
            <EditIcon color='primary' />
        </Button>
                   
      </header>
    </div>
  );
}

export default App;
