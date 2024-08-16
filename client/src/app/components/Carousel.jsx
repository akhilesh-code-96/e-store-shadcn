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
        "https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897327.jpg?t=st=1723833589~exp=1723837189~hmac=1f93aa4ff4cad1dbe1c90680d49872fffd3094dd2f67104a4b19d86cff315df3&w=996",
    },
    {
      image:
        "https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg?t=st=1723833781~exp=1723837381~hmac=1819cf6dafc8b76e20175460c8c5c51b53b3199166ef52e3505e68c36383b6d2&w=996",
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
    <Paper>
      <img
        src={`${props.item.image}`}
        alt="image"
        style={{
          height: "50vh",
          width: "100%",
          objectFit: "cover",
          aspectRatio: "16/9", // Maintain a 16:9 aspect ratio
          maxHeight: "100%",
        }}
      />
    </Paper>
  );
}
