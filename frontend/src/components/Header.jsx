import React, { useContext } from "react";
import "../styles/header.css";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import AttractionsIcon from "@mui/icons-material/Attractions";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { SearchContext } from "../context/SearchContext";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openDate, setOpenDate] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 1,
    room: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);

  const handleOption = (name, operation) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = (e) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    e.preventDefault();
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer ListMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem  active">
            <HotelIcon />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <LocalAirportIcon />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <DirectionsCarIcon />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <AttractionsIcon />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <LocalTaxiIcon />
            <span>Airport Taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free WinBooking app
            </p>
            <button className="headerBtn">Sign In / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <HotelIcon className="headerSearchIcon" />
                <input
                  type="text"
                  placeholder="where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <CalendarMonthIcon className="headerSearchIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <PersonIcon className="headerSearchIcon" />

                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions(!openOptions)}
                >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItems">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                          disabled={options.adult <= 1}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                          disabled={options.children <= 0}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItems">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
