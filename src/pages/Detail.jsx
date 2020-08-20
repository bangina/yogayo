import React from "react";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";

const Detail = () => {
  return (
    <Box maxWidth={343}>
      <CardContent>
        <TextInfoContent
          useStyles={useN01TextInfoContentStyles}
          overline={"March 20, 2019"}
          heading={"Nature Around Us"}
          body={
            "We are going to learn different kinds of species in nature that live together to form amazing environment."
          }
        />
      </CardContent>
    </Box>
  );
};

export default Detail;
