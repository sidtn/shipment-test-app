import React, { useState, useEffect } from "react";
import MyInput from "../ui/input/MyInput";
import MyButton from "../ui/button/MyButton";
import ApiService from "API/ApiService";

const SenderEditForm = ({ sender, update }) => {
  const [senderData, setSenderData] = useState(sender);
  const [error, setError] = useState();

  useEffect(() => {
    setSenderData(sender);
  }, [sender]);

  const updateSender = async () => {
    try {
      const response = await ApiService.updateSenderById(
        senderData.id,
        senderData.name,
        senderData.phone
      );
      setSenderData(response.data);
      update(response.data);
      setError(null);
    } catch (e) {
      setError(e.response.status === 400 ? e.response.data : e.message);
    }
  };

  const changeSender = (e) => {
    e.preventDefault();
    updateSender();
  };

  return (
    <form>
      <span>Name</span>
      <MyInput
        value={senderData.name}
        onChange={(e) => setSenderData({ ...senderData, name: e.target.value })}
        type="text"
        placeholder="Name"
      />
      <span>Phone</span>
      <MyInput
        value={senderData.phone}
        onChange={(e) =>
          setSenderData({ ...senderData, phone: e.target.value })
        }
        type="text"
        placeholder="Phone"
      />
      <MyButton onClick={changeSender}>Edit</MyButton>
      {error && <div style={{ color: "red" }}>{JSON.stringify(error)}</div>}
    </form>
  );
};

export default SenderEditForm;
