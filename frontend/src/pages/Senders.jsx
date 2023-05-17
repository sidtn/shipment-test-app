import MyButton from "../components/ui/button/MyButton";
import ApiService from "../API/ApiService";
import React, { useEffect, useState } from "react";
import MyModal from "../components/ui/Modals/MyModal";
import SenderEditForm from "../components/senders/SenderEditForm";
import SenderCreateForm from "components/senders/SenderCreateForm";
import Spinner from "components/ui/spinner/Spinner";

const Senders = () => {
  const [sendersList, setSenderslist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [activeSender, setActiveSender] = useState();
  const [putModal, setPutModal] = useState(false);
  const [postModal, setPostModal] = useState(false);

  const getAllSenders = async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.getAllSenders();
      setSenderslist(response.data.sort((a, b) => a["id"].localeCompare(b["id"])));
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllSenders();
  }, [putModal, postModal]);

  const handleEditClick = (sender) => {
    setActiveSender(sender);
    setPutModal(true);
  };

  return (
    <div>
      {error && <h3>{error}</h3>}
      {sendersList.map((sender) => (
        <div className="sender__item" key={sender.id}>
          Name: {sender.name} Phone: {sender.phone}
          <div>
            <MyButton onClick={() => handleEditClick(sender)}>Edit</MyButton>
          </div>
        </div>
      ))}
      <div className="add__btn">
        {isLoading ? (
          <Spinner />
        ) : (
          <MyButton onClick={() => setPostModal(true)}>Add sender</MyButton>
        )}
      </div>
      <div>
        <MyModal visible={putModal} setVisible={setPutModal}>
          {activeSender && (
            <SenderEditForm
              sender={activeSender}
              update={() => setPutModal(false)}
            />
          )}
        </MyModal>
      </div>
      <div>
        <MyModal visible={postModal} setVisible={setPostModal}>
          <SenderCreateForm create={() => setPostModal(false)} />
        </MyModal>
      </div>
    </div>
  );
};

export default Senders;
