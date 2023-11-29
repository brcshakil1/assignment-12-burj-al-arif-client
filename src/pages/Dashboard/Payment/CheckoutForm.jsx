import { Button } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { PropTypes } from "prop-types";
import useAuth from "../../../hook/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const axiosSecure = useAxiosSecure();
  const elements = useElements();
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const rentedMonth = localStorage.getItem("rented-month");
  // const [clientSecret, setClientSecret] = useState("");

  //  const axiosSecure = useAxiosSecure();

  const { data: memberAgreement, isPending } = useQuery({
    queryKey: ["member-agreement"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${id}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  console.log("month-------->", rentedMonth);

  // useEffect(() => {
  //   axiosSecure.post(`/create-payment-intent`, totalPrice).then((res) => {
  //     console.log(res.data.clientSecret);
  //     setClientSecret(res.data.clientSecret);
  //   });
  // }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("Payment method", paymentMethod);
      setError("");
    }

    // confirm payment
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button variant="contained" type="submit" disabled={!stripe}>
          Pay
        </Button>
        <p className="text-red-400">{error}</p>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  agreement: PropTypes.object,
};

export default CheckoutForm;
