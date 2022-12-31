import React from "react";
import DashboardNav from "./DashboardNav";
import ConnectNav from "./ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const DashboardSeller = () => {
  const state = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);

    try {
      await axios.post(
        "/stripe/createConnectAccount",
        {},
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
    } catch (err) {
      console.log(err);
      toast.error("Stripe connection failed, Try Again");
      setLoading(false);
    }
  };
  const connected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Post your Hotels</h2>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary" to="/hotels/new">
              + Add New
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const notConnected = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <div className="p-5 pointer">
              <HomeOutlined className="h1" />
              <h4>Setup payouts to post Hotel rooms</h4>
              <p className="lead">
                MERN partners with Stripe to transfer money to bank account
              </p>
              <button
                disabled={loading}
                className="btn btn-primary mb-3"
                onClick={handleClick}
              >
                {loading ? "Processing..." : "Setup Payouts"}
              </button>
              <p className="text-muted">
                <small>
                  You'll be redirected to Stripe to onboard the process
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>
      <div className="container-fluid p-4">
        <DashboardNav />
      </div>
      {state && state.stripe_seller && state.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
