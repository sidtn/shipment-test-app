import ApiService from "API/ApiService";
import React, { useState, useEffect } from "react";
import MyModal from "../components/ui/Modals/MyModal";
import MyButton from "../components/ui/button/MyButton";
import ShipmentEditForm from "../components/shipments/ShipmentEditForm";
import ShipMentCreateForm from "../components/shipments/ShipmentCreateForm";
import Spinner from "components/ui/spinner/Spinner";

const Shipments = () => {
  const [shipmentsList, setShipmetnsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [putModal, setPutModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [error, setError] = useState();
  const [shipmentForUpdate, setShipmentForUpdate] = useState({});

  const getAllShipmnets = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await ApiService.getAllShipmets();
      setShipmetnsList(response.data.sort((a, b) => a["id"].localeCompare(b["id"])));
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllShipmnets();
  }, [putModal, postModal]);

  const handleEditClick = (shipment) => {
    setShipmentForUpdate(shipment);
    setPutModal(true);
  };

  const handleUpdateStatus = async (shipment) => {
    try {
      const response = await ApiService.updateShipmentStatusById(shipment.id);
      getAllShipmnets();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (shipment) => {
    try {
      const response = await ApiService.deleteShipmentById(shipment.id);
      getAllShipmnets();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      {error && <h3>{error}</h3>}
      {shipmentsList.map((shipment) => (
        <div className="shipment__item" key={shipment.id}>
          <div className="shipment__block_text">
            <span>Sender name: {shipment.sender.name}</span>
            <span>Sender phone: {shipment.sender.phone}</span>
            <span>Address: {shipment.address.full_address}</span>
            <span>Created: {shipment.created_at}</span>
            <span>Status: {shipment.status}</span>
            {shipment.status === "DELIVERED" && (
              <span>Deliver date: {shipment.delivered_at}</span>
            )}
          </div>
          <div className="shipment__block_btns">
            <MyButton onClick={() => handleEditClick(shipment)}>Edit</MyButton>
            <MyButton
              onClick={() => handleUpdateStatus(shipment)}
              disabled={shipment.status === "DELIVERED"}
            >
              Update Status
            </MyButton>
            <MyButton onClick={() => handleDelete(shipment)}>Delete</MyButton>
          </div>
        </div>
      ))}
      <div className="add__btn">
        {isLoading ? (
          <Spinner />
        ) : (
          <MyButton onClick={() => setPostModal(true)}>Add shipment</MyButton>
        )}
      </div>
      <div>
        <MyModal visible={putModal} setVisible={setPutModal}>
          {shipmentForUpdate && (
            <ShipmentEditForm
              shipmentForUpdate={shipmentForUpdate}
              update={() => setPutModal(false)}
            />
          )}
        </MyModal>
      </div>
      <div>
        <MyModal visible={postModal} setVisible={setPostModal}>
          <ShipMentCreateForm create={() => setPostModal(false)} />
        </MyModal>
      </div>
    </div>
  );
};

export default Shipments;
