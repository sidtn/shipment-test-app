import ApiService from "API/ApiService";
import React, { useEffect, useState } from "react";

const AddressSelect = ({ address, setAddress }) => {
  const [value, setValue] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [disableValue, setDisableValue] = useState("Select address");

  const getAllAddresses = async () => {
    try {
      const response = await ApiService.getAllAddresses();
      setAddresses(response.data);
    } catch (e) {
      setDisableValue("Network error");
    }
  };

  useEffect(() => {
    getAllAddresses();
    {
      address && setValue(address.id);
    }
  }, [address]);

  return (
    <select
      className="select"
      value={address && address.id}
      onChange={(event) => setAddress(event.target.value)}
    >
      <option disabled value="">
        {disableValue}
      </option>

      {addresses.map((address) => (
        <option key={address.id} value={address.id}>
          {address.full_address}
        </option>
      ))}
    </select>
  );
};

export default AddressSelect;
