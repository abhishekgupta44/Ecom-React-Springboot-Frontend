import { Skeleton } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = ({ clientSecret, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  const isLoading = !clientSecret || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {clientSecret && <PaymentElement options={paymentElementOptions} />}
          {errorMessage && (
            <div className="text-red-500 mt-2">{errorMessage}</div>
          )}

          <div className="flex flex-col  mt-2 mb-2  border-2 pt-1 bg-slate-300 text-slate-700 rounded-sm px-2">
            <div className="font-semibold mb-4 underline">Sample Card Details:</div>
            <div className=" mt-1">Card Number: 4242 4242 4242 4242</div>
            <div className=" mt-1">Expiry Date: (any future date)</div>
            <div className=" mt-1">CVC: (any random 3-digit number)</div>
          </div>

          <button
            className="text-white w-full px-5 py-[10px] bg-black mt-2 mb-15 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            disabled={!stripe || isLoading}
          >
            {!isLoading
              ? `Pay ₹${Number(totalPrice).toFixed(2)}`
              : "Processing"}
          </button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
