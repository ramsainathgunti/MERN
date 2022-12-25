import "../styles/reserve.css";
import CancelIcon from "@mui/icons-material/Cancel";
import useFetch from "../customhook/useFetch";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { dates } = useContext(SearchContext);
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);
  console.log(dates);
  const getDatesInRange = (sDate, eDate) => {
    const start = new Date(sDate);
    const end = new Date(eDate);
    const date = new Date(start.getTime());
    const list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  };
  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    console.log("Found=", isFound);
    return !isFound;
  };
  const handleClick = async (e) => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <CancelIcon onClick={() => setOpen(false)} className="rClose" />
        <span>Select your rooms:</span>
        {data.map((item) => {
          return (
            <div className="rItem">
              <div className="rItemInfo">
                <div className="rTitle">
                  <b>{item.title}</b>
                </div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMaxPeople">Max People:{item.maxPeople}</div>
                <div className="rPrice">Price: ₹{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNum) => (
                  <div className="room">
                    <label htmlFor="">{roomNum.number}</label>
                    <input
                      type="checkbox"
                      value={roomNum._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNum)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button className="rButton" onClick={handleClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
