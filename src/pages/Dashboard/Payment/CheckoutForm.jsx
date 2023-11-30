import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, TextField } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import toast from "react-hot-toast";
import useCoupons from "../../../hook/useCoupons";
import Loading from "../../../components/Loading/Loading";

const CheckoutForm = () => {
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [couponMatched, setCouponMatched] = useState(false);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coupons, isCouponPending] = useCoupons();

  const {
    data: memberAgreement,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["member-agreement"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (memberAgreement) {
      setTotalPrice(memberAgreement?.rent);
    }
  }, [memberAgreement]);

  const handleSubmitCoupon = (e) => {
    e.preventDefault();
    const searchCoupon = e.target.coupon.value;
    const coupon = coupons?.find((coupon) => coupon?.code === searchCoupon);
    if (coupon) {
      const discount = parseInt(coupon?.discount);
      const discountPrice = totalPrice - (totalPrice * discount) / 100;
      toast.success(`You get ${discount}% discount`);
      setTotalPrice(discountPrice);
      setCouponMatched(true);
    } else {
      toast.error("Coupon isn't valid");
    }

    console.log(coupon);
  };

  console.log(totalPrice, "fsdfafa");

  // coupon
  // const handleCoupon = (e) => {
  //   e.preventDefault();
  //   const coupon = e.target.coupon.value;
  //   console.log(price);
  // };

  useEffect(() => {
    if (totalPrice) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
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
          if (res?.data?.result?.insertedId) {
            toast.success("Your payment was successful!");
            refetch();
            navigate("/dashboard/payment-history");
          }
        });
      }
    }
  };

  return (
    <div>
      {isPending || isCouponPending ? (
        <Loading />
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
              onSubmit={handleSubmitCoupon}
            >
              <TextField
                id="outlined-basic"
                label="Coupon"
                name="coupon"
                variant="outlined"
              />
              <br />
              {couponMatched ? (
                <Button type="submit" disabled>
                  Submit Coupon
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Submit Coupon
                </Button>
              )}
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
