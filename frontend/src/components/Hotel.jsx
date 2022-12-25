import "../styles/hotel.css";
import Navbar from "./Navbar";
import Header from "./Header";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Footer from "./Footer";
import MailList from "./MailList";
import { useState, useContext } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import CancelIcon from "@mui/icons-material/Cancel";
import useFetch from "../customhook/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Reserve from "./Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data, loading, error, reFetch } = useFetch(`/hotels/hotel/${id}`);
  console.log(data);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(!open);
  };
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];
  const handleSlide = (direction) => {
    let newSlideNumbe;
    if (direction === "l") {
      newSlideNumbe = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumbe = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumbe);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setOpenModel(!openModel);
  };

  return (
    <div className="hotel">
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading..."
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <CancelIcon className="close" onClick={() => setOpen(false)} />
              <ArrowCircleLeftIcon
                className="arrow"
                onClick={() => handleSlide("l")}
              />
              <div className="slideWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <ArrowCircleRightIcon
                className="arrow"
                onClick={() => handleSlide("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="hotelBookNow">Reserve or Book Now</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <LocationOnIcon />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              {`${data.city} - ${data.distance}m from center`}
            </span>
            <span className="hotelPriceHighLight">
              {` Book a stay at ${data.cheapestPrice} and get a free Airport Taxi`}
            </span>

            <div className="hotelImages">
              {photos.map((photo, index) => (
                <div className="hotelImgWrapper" key={index}>
                  <img
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                    onClick={() => handleOpen(index)}
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
    </div>
  );
};

export default Hotel;
