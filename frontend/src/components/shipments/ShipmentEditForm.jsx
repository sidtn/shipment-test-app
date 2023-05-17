import React, { useEffect, useState } from "react";
import SenderSelect from "./SenderSelect";
import MyButton from "components/ui/button/MyButton";
import AddressSelect from "./AddressSelect";
import ApiService from "API/ApiService";

const ShipmentEditForm = ({ shipmentForUpdate, update }) => {
  const [shipmentData, setShipmentData] = useState({});
  const [dataForPut, setDataforPut] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (shipmentForUpdate.id) {
      setShipmentData(shipmentForUpdate);
      setDataforPut({
        id: shipmentForUpdate.id,
        sender: shipmentForUpdate.sender.id,
        address: shipmentForUpdate.address.id,
        created_at: shipmentForUpdate.created_at,
      });
    }
  }, [shipmentForUpdate]);

  const changeShipment = async () => {
    try {
      const response = await ApiService.updateShipmentById(
        dataForPut.id,
        dataForPut.sender,
        dataForPut.address
      );
      update();
      setError(null);
    } catch (e) {
      setError(e.response.status === 400 ? e.response.data : e.message);
    }
  };

  const updateShipment = (e) => {
    e.preventDefault();
    changeShipment();
  };

  const handleSenderSelect = (senderId) => {
    setShipmentData({ ...shipmentData, sender: senderId });
    setDataforPut({ ...dataForPut, sender: senderId });
  };

  const handleAddressSelect = (addressId) => {
    setShipmentData({ ...shipmentData, address: addressId });
    setDataforPut({ ...dataForPut, address: addressId });
  };

  return (
    <div>
      <div className="select__block">
        <span>Sender</span>
        <SenderSelect
          sender={shipmentData.sender}
          setSender={handleSenderSelect}
        />
        <span>Address</span>
        <AddressSelect
          address={shipmentData.address}
          setAddress={handleAddressSelect}
        />
      </div>
      <MyButton onClick={updateShipment}>Edit</MyButton>
      {error && <div style={{ color: "red" }}>{JSON.stringify(error)}</div>}
    </div>
  );
};

export default ShipmentEditForm;
