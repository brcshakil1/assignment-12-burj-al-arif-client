import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
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

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: members,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users?role=member");
      return data;
    },
  });

  const handleRemove = (member) => {
    //console.log(member);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove his membership!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateUserRole = {
          role: "user",
        };
        axiosSecure
          .patch(`/users/${member?.email}`, updateUserRole)
          .then((res) => {
            if (res?.data?.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: `Removed ${member?.name}'s membership!`,
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      {isPending ? (
        <Loading />
      ) : (
        <div>
          {members?.length ? (
            <div>
              <div className="py-5">
                <SectionTitle title="Manage Members" justify="justify-center" />
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
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members?.map((member) => (
                      <StyledTableRow key={member.name}>
                        <StyledTableCell align="left">
                          {member.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {member.email}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Button
                            onClick={() => handleRemove(member)}
                            className="bg-tertiary font-semibold text-primary"
                          >
                            Remove
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl text secondary font-semibold text-center py-20">
                There are no members yet!
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
