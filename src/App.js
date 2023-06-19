import { useState, useEffect } from 'react';
import './App.css';
import { storage } from './firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload == null)
      return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
      });
    });

  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      const promises = response.items.map((item) => {
        return getDownloadURL(item);
      });
      
      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, [imageList]);

  return (
    <div className="App">
      <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
      <button onClick={uploadImage}>Upload Image</button>
      {imageList.map((url, index) => {
        return <img src={url} key={index} alt={`image-${index}`} />
      })}
    </div>
  );
}

export default App;
