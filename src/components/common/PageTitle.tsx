import { Typography } from "@mui/material";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
    return (
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 550 }}>
            {title}
        </Typography>
    );
};
export default PageTitle;