import { useEffect, useState, createContext } from "react";
import "./App.scss";
import Container from "./components/Container/Container";
export const ImagesContext = createContext();
function App() {
  const [images, setImages] = useState([]);
  const [currImg, setCurrImg] = useState({});

  const store = {
    images: [images, setImages],
    currImg: [currImg, setCurrImg],
  };

  useEffect(() => {
    const getImages = async () => {
      const ImgFromApi = await fetchImages();
      setImages(ImgFromApi);
      setCurrImg(ImgFromApi[0]);
    };
    getImages();
  }, []);

  const fetchImages = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos/?_limit=6"
    );
    const data = await res.json();
    return data;
    // console.log(data);
  };

  return (
    <div className="App">
      <ImagesContext.Provider value={store}>
        <Container />
      </ImagesContext.Provider>
    </div>
  );
}

export default App;
