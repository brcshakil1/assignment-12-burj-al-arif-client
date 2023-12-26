import { Box, Button, TextField } from "@mui/material";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { imageUpload } from "../../../api/utils";
import toast from "react-hot-toast";

const AddApartment = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const floorNo = parseInt(form.floorNo.value);
    const blockName = form.blockName.value;
    const apartmentNo = form.apartmentNo.value;
    const rent = form.rent.value;
    const photo = form.photo.files[0];

    try {
      // Upload image
      const imageData = await imageUpload(photo);

      if (imageData.status === 200) {
        const apartment = {
          name,
          floorNo,
          blockName,
          apartmentNo,
          rent,
          imageSrc: imageData?.data?.display_url,
        };

        const res = await axiosSecure.post("/apartments", apartment);

        if (res.data.insertedId) {
          toast.success("Successfully add a new apartment!");
          form.reset();
        }
      }
      // Save user data in Database
      //   //console.log(apartment);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <h2 className="text-center">Add Apartment</h2>
      <div>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className=" w-full md:w-[600px] py-8 px-6 mx-auto "
        >
          <TextField
            className="w-full ml-0 mb-3"
            fullWidth
            label="name"
            id="fullWidth"
            name="name"
            required
          />
          <div className="flex flex-col space-y-2">
            <input
              id="photo"
              type="file"
              name="photo"
              placeholder="Select Image"
              className="border 
                 text-black border-gray-500
                   outline-none py-3
                   focus:border-2 focus:border-blue-400
                   bg-transparent rounded-md text-xl px-2"
              required
            />
          </div>
          <TextField
            className="w-full ml-0 my-3"
            fullWidth
            label="floor no"
            id="fullWidth"
            name="floorNo"
            required
          />{" "}
          <br />
          <TextField
            className="w-full ml-0"
            fullWidth
            label="block name"
            id="fullWidth"
            name="blockName"
            required
          />{" "}
          <br />
          <TextField
            className="w-full ml-0 my-3"
            fullWidth
            label="apartment number"
            id="fullWidth"
            name="apartmentNo"
            required
          />{" "}
          <br />
          <TextField
            className="w-full ml-0 mb-3"
            fullWidth
            label="rent"
            name="rent"
            id="fullWidth"
            required
          />
          <div className="text-center">
            <Button type="submit" className="mt-4" variant="contained">
              Add Apartment
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddApartment;
