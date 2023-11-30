import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";

const MakePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [month, setMonth] = useState("");
  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { data: memberAgreement, isPending } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?status=checked`);
      const filterByMember = res?.data?.filter(
        (member) => member?.userEmail === user?.email
      );
      return filterByMember;
    },
  });

  if (month) {
    localStorage.setItem("rented-month", month);
  }

  return (
    <div className="grid place-items-center">
      {isPending ? (
        <Loading />
      ) : memberAgreement?.length ? (
        <>
          <SectionTitle title="Make Payment" justify="justify-center" />
          <div className="w-full md:max-w-[600px] flex justify-between pt-10">
            <h3 className="text-2xl font-semibold">Total Rent: </h3>
          </div>
          <div className="grid grid-cols-1 pt-5 pb-10 gap-10 w-full md:max-w-[600px] place-items-center">
            {memberAgreement?.map((agreement) => (
              <Box
                key={agreement._id}
                component="form"
                className="rounded-md"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                  border: "1px solid gray",
                  padding: "10px 0",
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      defaultValue={agreement?.userEmail}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Floor"
                      defaultValue={agreement?.floorNo}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Block Name"
                      defaultValue={agreement?.blockName}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Apartment No"
                      defaultValue={agreement?.apartmentNo}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row">
                    <TextField
                      id="outlined-search"
                      label="Rent"
                      defaultValue={`$${agreement?.rent}`}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <div className="flex-1 px-3">
                      <select
                        id="month"
                        onChange={(e) => setMonth(e.target.value)}
                        className="h-[58px] w-full pl-3  mt-2 rounded-md bg-transparent border border-slate-300"
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>

                      {month ? (
                        ""
                      ) : (
                        <p className="text-red-400">Please select a month </p>
                      )}
                    </div>
                  </div>

                  {month ? (
                    <NavLink to={`/dashboard/payment/${agreement?._id}`}>
                      <Button
                        type="button"
                        className="mx-2 "
                        variant="contained"
                      >
                        Pay
                      </Button>
                    </NavLink>
                  ) : (
                    <Button type="button" className="mx-2" disabled>
                      Pay
                    </Button>
                  )}
                </div>
              </Box>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold">No agreement confirm yet!</h3>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
