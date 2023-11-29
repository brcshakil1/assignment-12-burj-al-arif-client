import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";

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

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const axiosPublic = useAxiosPublic();

  const { data: announcements = [], isPending } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const date = new Date().toDateString();

    if (title === "" || title === " ") {
      return toast.error("You must provide a title!");
    }
    if (description === "" || description === " ") {
      return toast.error("You must provide a description!");
    }

    const announcement = {
      title,
      description,
      date,
    };
    console.log(announcement);
    const res = await axiosSecure.post("/announcements", announcement);
    if (res.data.insertedId)
      toast.success("You've successfully added an announcement!");
  };

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <SectionTitle title="Make an announcement" justify="justify-center" />
          <Box
            onSubmit={handleSubmit}
            className="w-full md:w-2/3 mx-auto py-14 md:py-20"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                className="w-full mx-0"
                id="outlined-multiline-flexible"
                label="Title"
                name="title"
                multiline
              />
            </div>
            <div>
              <TextField
                className="w-full mx-0"
                id="outlined-multiline-static"
                label="Description"
                name="description"
                multiline
                rows={4}
              />
            </div>
            <div>
              <Button
                type="submit"
                className=" font-semibold bg-tertiary w-full"
                variant="contained"
              >
                Confirm
              </Button>
            </div>
          </Box>
          <div>
            <h3 className="text-xl font-semibold text-secondary pt-6 pb-4">
              All announcement: {announcements?.length}
            </h3>
            <TableContainer component={Paper}>
              <Table
                className=" md:min-w-[550px] lg:min-w-[750px]"
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Title</StyledTableCell>
                    <StyledTableCell align="left">Description</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {announcements?.map((announcement) => (
                    <StyledTableRow key={announcement?._id}>
                      <StyledTableCell align="left">
                        {announcement?.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {announcement?.description}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {announcement?.date}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default MakeAnnouncement;
