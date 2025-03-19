import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/landing/css/addcompany.css"; // Create a CSS file for custom styles

export const AddCompany = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const getAllStates = async () => {
    const res = await axios.get("/state/getallstates");
    console.log(res.data);
    setStates(res.data.data);
  };

  const getCityByStateId = async (id) => {
    const res = await axios.get("city/getcitybystate/" + id);
    console.log("city response...", res.data);
    setCities(res.data.data);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    console.log(data);
    const userId = localStorage.getItem("id");
    data.userId = userId;
    const res = await axios.post("/company/addcompany", data);
    console.log(res.data);
  };

  return (
    <div className="add-company-page">
      <div className="add-company-card">
        <h1>Add Company</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name")}
              className="animated-input"
              placeholder="Enter company name"
            />
          </div>
          <div className="form-group">
            <label>Industry</label>
            <input
              type="text"
              {...register("industry")}
              className="animated-input"
              placeholder="Enter industry"
            />
          </div>
          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              {...register("website")}
              className="animated-input"
              placeholder="Enter website URL"
            />
          </div>
          <div className="form-group">
            <label>Select State</label>
            <select
              {...register("stateId")}
              className="styled-select"
              onChange={(event) => getCityByStateId(event.target.value)}
            >
              <option value="">Select State</option>
              {states?.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select City</label>
            <select
              {...register("cityId")}
              className="styled-select"
              onChange={(event) => getAreaByCityId(event.target.value)}
            >
              <option value="">Select City</option>
              {cities?.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};