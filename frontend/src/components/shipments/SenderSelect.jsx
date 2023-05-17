import ApiService from "API/ApiService";
import React, { useEffect, useState } from "react";

const SenderSelect = ({ sender, setSender }) => {
  const [value, setValue] = useState("");
  const [senders, setSenders] = useState([]);
  const [disableValue, setDisableValue] = useState("Select sender");

  const getAllSenders = async () => {
    try {
      const response = await ApiService.getAllSenders();
      setSenders(response.data);
    } catch (e) {
      setDisableValue("Network error");
    }
  };

  useEffect(() => {
    getAllSenders();
    {
      sender && setValue(sender.id);
    }
  }, [sender]);

  return (
    <select
      className="select"
      value={sender && sender.id}
      onChange={(event) => setSender(event.target.value)}
    >
      <option disabled value="">
        {disableValue}
      </option>

      {senders.map((sender) => (
        <option key={sender.id} value={sender.id}>
          {sender.name}
        </option>
      ))}
    </select>
  );
};

export default SenderSelect;
