import Container from "@mui/material/Container";
import { FC, ReactNode } from "react";

type PageContentProps = {
  children: ReactNode;
};

const PageContent: FC<PageContentProps> = ({ children }) => {
  return (
    <Container disableGutters sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {children}
    </Container>
  );
};

export default PageContent;
