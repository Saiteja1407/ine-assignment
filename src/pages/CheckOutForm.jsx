import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckOutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(stripe,elements);
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/user/complete`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
      >
        <PaymentElement id="payment-element" className="mb-6" />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="spinner border-t-4 border-white border-solid rounded-full w-6 h-6 mx-auto animate-spin"></div>
          ) : (
            "Pay now"
          )}
        </button>
        {message && <div className="text-red-500 text-center mt-4">{message}</div>}
      </form>
      <div className="mt-4 text-center text-gray-600 max-w-md px-4">
        Payment methods are dynamically displayed based on customer location, order amount, and currency.
      </div>
    </div>
  );
}
