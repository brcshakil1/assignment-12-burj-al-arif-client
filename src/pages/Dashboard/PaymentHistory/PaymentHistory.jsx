import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import { Box, Button, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PaymentHistory = () => {
  const [month, setMonth] = useState("");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentsHistory, isPaymentLoading } = useQuery({
    queryKey: ["paymentsHistory", month],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${user?.email}&rentedMonth=${month}`
      );
      return res.data.result;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchMonth = e.target.month.value;
    if (searchMonth) {
      setMonth(searchMonth);
    }
  };

  console.log(month, "jksdhfkjsadfhjksa");

  return (
    <div>
      {isPaymentLoading ? (
        <Loading />
      ) : paymentsHistory?.length ? (
        <>
          <SectionTitle title="Payment History" justify="justify-center" />
          <div className="py-10">
            <div className="flex flex-col md:flex-row">
              <div className="py-10">
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSearch}
                >
                  <TextField
                    id="outlined-basic"
                    label="Search by Month"
                    name="month"
                    variant="outlined"
                  />
                  <br />

                  <Button type="submit" variant="contained">
                    Search
                  </Button>
                </Box>
              </div>
            </div>
            <TableContainer component={Paper}>
              <Table
                className=" md:min-w-[550px] lg:min-w-[750px]"
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Floor</StyledTableCell>
                    <StyledTableCell align="left">Block</StyledTableCell>
                    <StyledTableCell align="left">Apartment no</StyledTableCell>
                    <StyledTableCell align="left">Payment</StyledTableCell>
                    <StyledTableCell align="left">Month</StyledTableCell>
                    <StyledTableCell align="left">
                      Date of payment
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentsHistory?.map((payment) => (
                    <StyledTableRow key={payment._id}>
                      <StyledTableCell align="left">
                        {payment?.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.floorNo}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.blockName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.apartmentNo}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.rented}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.rentedMonth}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {payment?.paymentDate}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      ) : (
        <div>
          <h3 className="text-2xl font-semibold">
            No payment history available in this month!
          </h3>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
