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
import toast from "react-hot-toast";

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

  const { data: coupons, refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const handleAddCoupon = async (e) => {
    e.preventDefault();

    const form = e.target;
    const code = form.code.value;
    const discount = parseFloat(form.discount.value);
    const description = form.description.value;

    if (code === "" || discount === "" || description === "") {
      return toast.error("Please fill all fields");
    }

    const coupon = {
      code,
      discount,
      description,
    };
    console.log(coupon);
    const res = await axiosSecure.post("/coupons", coupon);
    if (res.data.insertedId) {
      refetch();

      toast.success("You've successfully added a coupon");
    }
  };

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
                  <StyledTableCell align="left">Code</StyledTableCell>
                  <StyledTableCell align="left">Discount</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons?.map((coupon) => (
                  <StyledTableRow key={coupon?._id}>
                    <StyledTableCell align="left">
                      {coupon?.code}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coupon?.discount}%
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coupon?.description}
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
          <Box
            onSubmit={handleAddCoupon}
            component="form"
            sx={style}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="outlined-multiline-flexible"
                label="Coupon Code"
                name="code"
                multiline
              />
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="outlined-textarea"
                label="Discount"
                name="discount"
                placeholder="Placeholder"
                multiline
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%", marginBottom: "10px" }}
                id="outlined-multiline-static"
                label="Description"
                name="description"
                multiline
                rows={4}
              />
            </div>
            <Button type="submit" className="bg-tertiary" variant="contained">
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ManageCoupons;
