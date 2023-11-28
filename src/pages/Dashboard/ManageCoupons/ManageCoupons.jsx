import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Box, Button, Modal, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: coupons } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  console.log(coupons);

  return (
    <div>
      <SectionTitle title="Manage Coupons" justify="justify-center" />
      <div>
        <div className="flex justify-between px-5 md:px-20 py-10">
          <h3 className="text-xl md:text-3xl font-semibold text-secondary">
            All Coupons
          </h3>
          <Button
            onClick={handleOpen}
            className="bg-secondary font-semibold"
            variant="contained"
          >
            Add Coupon
          </Button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table
              className=" md:min-w-[550px] lg:min-w-[750px]"
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Discount</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons?.map((coupon) => (
                  <StyledTableRow key={coupon?._id}>
                    <StyledTableCell align="left">
                      {coupon?.coupon_code}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coupon?.discount_percentage}%
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coupon?.coupon_description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button className="bg-tertiary font-semibold text-primary">
                        Remove
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style} noValidate autoComplete="off">
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="outlined-multiline-flexible"
                label="Coupon Name"
                multiline
              />
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="outlined-textarea"
                label="Discount"
                placeholder="Placeholder"
                multiline
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
              />
            </div>
            <Button className="bg-tertiary" variant="contained">
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ManageCoupons;
