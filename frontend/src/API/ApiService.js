import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1";

export default class ApiService {
  static async getAllSenders() {
    const response = await axios.get(`${API_URL}/senders/`);
    return response;
  }

  static async getSenderById(id) {
    const response = await axios.get(`${API_URL}/senders/${id}/`);
    return response;
  }

  static async createSender(name, phone) {
    const response = await axios.post(`${API_URL}/senders/`, {
      name: name,
      phone: phone,
    });
    return response;
  }

  static async updateSenderById(id, name, phone) {
    const response = await axios.put(`${API_URL}/senders/${id}/`, {
      name: name,
      phone: phone,
    });
    return response;
  }

  static async getAllShipmets() {
    const response = await axios.get(`${API_URL}/shipments/`);
    return response;
  }

  static async getShipmentById(id) {
    const response = await axios.get(`${API_URL}/shipments/${id}/`);
    return response;
  }

  static async createShipment(sender, address) {
    const response = await axios.post(`${API_URL}/shipments/`, {
      sender: sender,
      address: address,
    });
    return response;
  }

  static async updateShipmentById(id, sender, address) {
    const response = await axios.put(`${API_URL}/shipments/${id}/`, {
      sender: sender,
      address: address,
    });
    return response;
  }

  static async updateShipmentStatusById(id) {
    const response = await axios.put(
      `${API_URL}/shipments/${id}/update_status/`
    );
    return response;
  }

  static async deleteShipmentById(id) {
    const response = await axios.delete(`${API_URL}/shipments/${id}/`);
    return response;
  }

  static async getAllAddresses() {
    const response = await axios.get(`${API_URL}/addresses/`);
    return response;
  }
}
