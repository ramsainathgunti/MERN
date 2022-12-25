import { Link } from "react-router-dom";
import "../styles/searchHotelList.css";
import React from "react";

const SearchHotelList = ({ item, key }) => {
  console.log(item);
  return (
    <div className="searchHotelList" key={key}>
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="shlImg"
      />
      <div className="shlDesc">
        <h1 className="sihTitle">{item.name}</h1>
        <span className="sihDistance">{item.distance}m from center</span>
        <span className="sihTaxiOp">Free Airport Taxi</span>
        <span className="sihSubTitle">
          Studio Apartment with Air Conditioning
        </span>
        <span className="sihFeatures">{item.desc}</span>
        <span className="sihCancelOp">Free Cancellation</span>
        <span className="sihCancelOpSubTitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="shlDetails">
        {item.rating && (
          <div className="shlRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="shlDetailTexts">
          <span className="shlPrice">${item.cheapestPrice}</span>
          <span className="shlTaxiOp">Includes all taxes</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="shlCheckBtn">Check Availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchHotelList;
