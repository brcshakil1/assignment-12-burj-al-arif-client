import { useQuery } from "@tanstack/react-query";
import SectionTitle from "./../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "./../../../hook/useAxiosPublic";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
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

const Announcement = () => {
  const axiosPublic = useAxiosPublic();

  const { data: announcements = [], isPending } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcements");
      return res.data;
    },
  });

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          {" "}
          <SectionTitle title="Announcement" justify="justify-center" />
          <div>
            <h3 className="text-xl font-semibold text-secondary pt-6 pb-4">
              Total announcement: {announcements?.length}
            </h3>
            <div>
              <TableContainer component={Paper}>
                <Table
                  className=" md:min-w-[550px] lg:min-w-[750px]"
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Title</StyledTableCell>
                      <StyledTableCell align="left">
                        Description
                      </StyledTableCell>
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
          </div>
        </>
      )}
    </div>
  );
};

export default Announcement;
