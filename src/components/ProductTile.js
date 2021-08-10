import React from "react";
import { Grid, Button, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

export default function ProductTile({
  image,
  name,
  weight,
  isInStock,
  price,
  finalPrice,
  rating,
  reviewCount,
}) {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  return (
    <div style={{ height: "100%" }}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={4} sm={12} md={12}>
          <div>
            <img
              src={image}
              alt={name}
              style={isLargeScreen ? {} : { width: "100%" }}
            />
          </div>
        </Grid>
        <Grid
          item
          container
          xs={8}
          sm={12}
          spacing={isLargeScreen ? 1 : 0}
          md={12}
          style={{ fontSize: "14px" }}
        >
          <Grid item xs={12}>
            {name}
          </Grid>
          <Grid item xs={12} style={{ color: "#757575", fontSize: "12px" }}>
            ({weight})
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#757575",
              paddingTop: "5px",
              paddingBottom: "7px",
            }}
          >
            <Rating
              name="rating"
              size="small"
              value={rating}
              precision={0.1}
              readOnly
            />
            ({reviewCount ? reviewCount : 0})
          </Grid>
          <Grid item container>
            <Grid item xs={3}>
              <strong>₹ {finalPrice}</strong>
            </Grid>
            {price !== finalPrice ? (
              <Grid item xs={3}>
                <strong style={{ textDecoration: "line-through" }}>
                  ₹ {price}
                </strong>
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "7px" }}>
            {isInStock ? (
              <Button
                disableElevation
                variant="contained"
                fullWidth={isLargeScreen}
                style={{ backgroundColor: "#4fcf64", color: "#fff" }}
              >
                ADD TO CART
              </Button>
            ) : (
              <Button
                disableElevation
                variant="contained"
                disabled
                fullWidth={isLargeScreen}
                style={{ color: "#fff" }}
              >
                OUT OF STOCK
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
