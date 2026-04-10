import { Box, Paper, Skeleton, Stack } from "@mui/material";

const GoogleBookListSkeleton = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {[...Array(12)].map((_, index) => (
        <Paper
          key={index}
          elevation={0}
          sx={{
            p: 1,
            borderRadius: 2,
            ":hover": {
              boxShadow: "0 0 13px rgba(33,33,33,.2)",
              cursor: "pointer",
            },
          }}
        >
          <Stack
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <Skeleton variant="rectangular" width={175} height={250} />
            </Box>

            <Skeleton variant="text" width={120} height={30} />
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="rounded" width="100%" height={36} />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default GoogleBookListSkeleton;