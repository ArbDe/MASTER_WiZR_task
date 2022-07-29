import { useContext } from "react";
import { ImagesContext } from "../../App";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useSwipeable } from "react-swipeable";
import "./container-style.scss";

function Contetn() {
  const { images } = useContext(ImagesContext);
  const { currImg } = useContext(ImagesContext);

  const [cimg, setCimg] = currImg;
  const [imgs, setImgs] = images;

  const handleClick = (index) => {
    const slider = imgs[index];
    setCimg(slider);
  };

  const prevSlide = () => {
    if (cimg.id === 1) {
      setCimg(imgs[imgs.length - 1]);
    } else {
      imgs.forEach((img) => {
        if (cimg.id - 1 === img.id) {
          setCimg(img);
        }
      });
    }
  };

  const nextSlide = () => {
    if (cimg.id === 6) {
      setCimg(imgs[0]);
    } else {
      imgs.forEach((img) => {
        if (cimg.id + 1 === img.id) {
          setCimg(img);
        }
      });
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    preventDefaultTouchmoveEvent: true,
  });

  return (
    <div className="slider">
      <h1>MASTER WiZR Modules</h1>

      <div className="flex-row">
        {imgs.map((data, index) => (
          <div key={index} className="thumbnail">
            {
              <img
                className={cimg.id === index + 1 ? "clicked" : ""}
                src={data.thumbnailUrl}
                alt={data.title}
                onClick={() => handleClick(index)}
              />
            }
          </div>
        ))}
      </div>
      <div {...handlers} className="main">
        <IoIosArrowDropleft
          className="left-arrow"
          onClick={() => prevSlide()}
        />
        <IoIosArrowDropright
          className="right-arrow"
          onClick={() => nextSlide()}
        />
        <img src={cimg.url} alt={cimg.url} />
      </div>
    </div>
  );
}
export default Contetn;
