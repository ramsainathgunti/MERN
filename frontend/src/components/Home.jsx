import React from "react";
import "../styles/home.css";
import Navbar from "./Navbar";
import Header from "./Header";
import FeaturedHotel from "./FeaturedHotel";
import PropertyList from "./PropertyList";
import FeaturedProperties from "./FeaturedProperties";
import MailList from "./MailList";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <FeaturedHotel />
        <h1 className="homeTitle">Browse by Property Type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
