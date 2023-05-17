import React, { useState } from "react";
import SenderSelect from "./SenderSelect";
import AddressSelect from "./AddressSelect";
import MyButton from "components/ui/button/MyButton";
import ApiService from "API/ApiService";

const ShipmentCreateForm = ({ create }) => {
  const [dataForCreate, setDataForCreate] = useState({
    sender: "",
    address: "",
  });
  const [error, setError] = useState();

  const createShipment = async () => {
    try {
      const response = await ApiService.createShipment(
        dataForCreate.sender,
        dataForCreate.address
      );
      create();
      setError(null);
    } catch (e) {
      setError(e.response.status === 400 ? e.response.data : e.message);
    }
  };

  const handleCreateClick = (e) => {
    e.preventDefault();
    createShipment();
  };

  return (
    <div>
      <div className="select__block">
        <span>Sender</span>
        <SenderSelect
          sender={dataForCreate.sender}
          setSender={(e) => setDataForCreate({ ...dataForCreate, sender: e })}
        />
        <span>Address</span>
        <AddressSelect
          address={dataForCreate.address}
          setAddress={(e) => setDataForCreate({ ...dataForCreate, address: e })}
        />
      </div>
      <MyButton onClick={handleCreateClick}>Create</MyButton>
      {error && <div style={{ color: "red" }}>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default ShipmentCreateForm;
