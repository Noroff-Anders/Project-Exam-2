import { create_booking } from "../../Shared/Api";
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

async function CreateBooking(data) {
  try {
    const response = await fetch(create_booking, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": localStorage.getItem("apikey"),
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

function BookVenue({ id }) {
  // Receive id as a prop
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
    venueId: "", // Initialize venueId state
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set venueId to id when the user submits the form
      await CreateBooking({ ...formData, venueId: id });
      console.log("Booking created successfully");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Book venue</h1>
      <Label>
        From Date:
        <Input
          type="date"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label>
        To Date:
        <Input
          type="date"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleInputChange}
          required
        />
      </Label>
      <Label>
        Guests:
        <Input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
          required
        />
      </Label>
      <SubmitButton type="submit">Create Booking</SubmitButton>
    </Form>
  );
}

export default BookVenue;
