import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";

export default function SuccessPage() {
  const [status, setStatus] = useState("checking...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("No session ID found");
      return;
    }

    checkPayment(sessionId);
  }, []);

  const checkPayment = async (sessionId) => {
    try {
      const res = await axiosClient.get(
        `/payment/status?session_id=${sessionId}`
      );
      setStatus(res.data.status);
    } catch (error) {
      setStatus("Error checking payment");
    }
  };

  return (
    <div>
      <h1>Payment Result</h1>
      <p>Status: {status}</p>
    </div>
  );
}
