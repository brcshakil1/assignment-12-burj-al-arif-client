import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, TextField } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const { data: memberAgreement, isPending } = useQuery({
    queryKey: ["member-agreement"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${id}`);
      return res.data;
    },
  });

  const totalPrice = memberAgreement?.rent;
  console.log(totalPrice);

  // coupon
  // const handleCoupon = (e) => {
  //   e.preventDefault();
  //   const coupon = e.target.coupon.value;
  //   console.log(price);
  // };

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("Stripe error", error);
    } else {
      setError("");
      console.log("Payment-method", paymentMethod);
    }

    // confirm card payment
    const { paymentIntent, error: paymentConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (paymentConfirmError) {
      console.log("confirm error");
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        console.log("Transaction Id:");

        // now save the payment in the database
        const paymentInfo = {
          name: user?.displayName,
          email: user?.email,
          rentedMonth: localStorage.getItem("rented-month"),
          rented: totalPrice,
          transactionId: paymentIntent?.id,
          agreementId: memberAgreement?._id,
          floorNo: memberAgreement?.floorNo,
          blockName: memberAgreement?.blockName,
          apartmentNo: memberAgreement?.apartmentNo,
          paymentDate: new Date().toDateString(),
        };

        axiosSecure.post("/payments", paymentInfo).then((res) => {
          console.log(res.data);
        });
      }
    }
  };

  return (
    <div>
      {isPending ? (
        <div>loading....</div>
      ) : (
        <div>
          {/* coupon */}
          <div className="py-10">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Coupon"
                name="coupon"
                variant="outlined"
              />
              <br />
              <Button type="submit" variant="contained">
                Submit Coupon
              </Button>
            </Box>
          </div>
          <h2 className="text-xl font-semibold">Total rent:{totalPrice}</h2>
          {/* payment form */}
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
            <Button
              className="my-2"
              type="submit"
              disabled={!stripe || !clientSecret}
              variant="contained"
            >
              Pay
            </Button>
          </form>
          <p className="text-red-400">{error}</p>
          {transactionId && (
            <p className="text-green-600">
              Your transaction id: {transactionId}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
