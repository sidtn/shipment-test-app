import ApiService from "API/ApiService";
import MyButton from "components/ui/button/MyButton";
import MyInput from "components/ui/input/MyInput";
import React, { useState } from "react";

const SenderCreateForm = ({ create }) => {
  const [senderData, setSenderData] = useState({ name: "", phone: "" });
  const [error, setError] = useState();

  const createSender = async () => {
    try {
      const response = await ApiService.createSender(
        senderData.name,
        senderData.phone
      );
      setSenderData(response.data);
      create(response.data);
      setError(null);
    } catch (e) {
      setError(e.response.status === 400 ? e.response.data : e.message);
    }
  };

  const addSender = (e) => {
    e.preventDefault();
    createSender();
  };

  return (
    <div>
      <form>
        <span>Name</span>
        <MyInput
          value={senderData.name}
          onChange={(e) =>
            setSenderData({ ...senderData, name: e.target.value })
          }
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
        <MyButton onClick={addSender}>Add</MyButton>
        {error && <div style={{ color: "red" }}>{JSON.stringify(error)}</div>}
      </form>
    </div>
  );
};

export default SenderCreateForm;
