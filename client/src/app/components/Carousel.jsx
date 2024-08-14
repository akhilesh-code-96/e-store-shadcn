import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

export default function Example(props) {
  var items = [
    {
      image:
        "https://images.pexels.com/photos/5650051/pexels-photo-5650051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      image:
        "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
