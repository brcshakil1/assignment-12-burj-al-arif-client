import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAuth from "../../../hook/useAuth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Button, MenuItem } from "@mui/material";

const months = [
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

const MakePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: memberAgreement } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?status=checked`);
      const filterByMember = res?.data?.filter(
        (member) => member?.userEmail === user?.email
      );
      return filterByMember;
    },
  });

  console.log(memberAgreement);

  return (
    <div className="grid place-items-center">
      <SectionTitle title="Make Payment" justify="justify-center" />
      <div className="grid grid-cols-1 py-10 gap-10 w-full md:max-w-[600px] place-items-center">
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
              <div>
                <TextField
                  id="outlined-search"
                  label="Rent"
                  defaultValue={agreement?.rent}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-select"
                  select
                  label="Month"
                  defaultValue="Select Month"
                  helperText="Please select month"
                >
                  {months?.map((month, idx) => (
                    <MenuItem key={idx} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <Button className="mx-2 " variant="contained">
                Pay
              </Button>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default MakePayment;
