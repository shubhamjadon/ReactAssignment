import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function ProductSkeleton({ viewAll }) {
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  return [1, 2, 3, 4, 5].map((ele, index) => {
    if (!viewAll && index > 2) return null;
    return (
      <Grid
        item
        xs={12}
        key={ele}
        sm={6}
        md={4}
        style={{
          borderBottom: "1px solid #f0f0f0",
          padding: isLargeScreen ? "20px 20px" : "20px 0",
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <Grid container spacing={2} style={{ height: "100%" }}>
            <Grid item xs={4} sm={12} md={12}>
              <Skeleton
                variant="rect"
                width="100%"
                height={isLargeScreen ? 150 : "100%"}
              />
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
                <Skeleton variant="text" />
              </Grid>
              <Grid item xs={12} style={{ color: "#757575", fontSize: "12px" }}>
                <Skeleton variant="text" />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="text" />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "5px" }}>
                <Skeleton variant="rect" width="100%" height="40px" />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  });
}
