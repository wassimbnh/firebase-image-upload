import { useState, useEffect } from 'react';
import './App.css';
import { storage } from './firebase';
import { ref, uploadBytes, listAll } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {

const [imageUpload, setImageUpload] = useState(null);
const [imageList, setImageList] = useState([]);
const imageListRef = ref(storage, "images/");

  const uploadImage = () =>{

    if(imageUpload == null) 
      return;
 
    const imageRef = ref(storage,`images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then(() =>{
      alert("Image uploaded")
    })
    
  };

  useEffect(() =>{
    listAll(imageListRef).then((response) =>{
      console.log(response)
    })
  },[]);

  return (
    <div className="App">
      <input type="file" onChange={(event) => setImageUpload(event.target.files[0])}/>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default App;
