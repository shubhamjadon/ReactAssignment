import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default function CategoryTab({ title, image, onClick }) {
  return (
    <Card
      style={{ minWidth: "180px", marginRight: "20px", cursor: "pointer" }}
      onClick={onClick}
    >
      <CardContent
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "whitesmoke",
          textAlign: "center",
        }}
      >
        {title}
      </CardContent>
    </Card>
  );
}
