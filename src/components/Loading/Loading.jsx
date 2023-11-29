import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div className="min-h-[70vh] grid place-items-center">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loading;
