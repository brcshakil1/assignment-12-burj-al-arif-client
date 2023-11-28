import { Box, Button, TextField } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

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
      <div></div>
    </div>
  );
};

export default MakeAnnouncement;
