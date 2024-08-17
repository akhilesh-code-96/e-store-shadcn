import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export default function Carousel_(props) {
  var items = [
    {
      image:
        "https://img.freepik.com/free-vector/online-shopping-concept-illustration-with-words-people_613284-2431.jpg?t=st=1723833718~exp=1723837318~hmac=f68f688ba84f3ea74b719cc73297b31977546b12d9753aeba934775ccf841efd&w=996",
    },
    {
      image:
        "https://img.freepik.com/free-psd/fashion-online-shopping-template-psd-blog-banner_53876-123526.jpg?t=st=1723833751~exp=1723837351~hmac=c850a2d089acdd59635bd82a44efedc5a724d2098d6239c190b70421bdca8bf0&w=996",
    },
    {
      image:
        "https://img.freepik.com/free-photo/purchasing-shop-buying-selling-teade_53876-134043.jpg?t=st=1723925283~exp=1723928883~hmac=9af475fabcaa661d02e7d21222673c1fbec37d9b65ed4c2c5dec3f5c325c7d53&w=1380",
    },
    {
      image:
        "https://img.freepik.com/free-photo/front-view-woman-with-shopping-bag-concept_23-2148674158.jpg?t=st=1723891329~exp=1723894929~hmac=453857824ec6d885669c1a2645c9838cea0739f4ce8562b23317fa409913952e&w=1380",
    },
  ];

  return (
    <Carousel
      indicatorIconButtonProps={{
        style: {
          display: "None",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        paddingTop: {
          xs: "70%", // 16:9 aspect ratio for smaller screens
          sm: "40%", // Slightly taller aspect ratio for small screens
          md: "30%", // Wider aspect ratio for medium screens
          lg: "40%", // Even wider aspect ratio for large screens
        },
      }}
    >
      <img
        src={`${props.item.image}`}
        alt="image"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Paper>
  );
}
