import Senders from "../pages/Senders";
import Shipments from "../pages/Shipments";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/senders" element={<Senders />} />
      <Route path="/shipments" element={<Shipments />} />
      <Route path="/*" element={<Navigate to="/shipments" />} />
    </Routes>
  );
};

export default AppRouter;
