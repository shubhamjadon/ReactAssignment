import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import { useQuery } from "react-query";
import "./App.css";
import CategoryTab from "./components/CategoryTab";
import ProductTile from "./components/ProductTile";
import Loading from "./components/Loading";
import ProductSkeleton from "./components/ProductSkeleton";

function App() {
  const [currentCategory, setCurrentCategory] = useState(185);
  const [categoryObj, setCategoryObj] = useState({});
  const [viewAll, setViewAll] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const queryConfig = { refetchOnWindowFocus: false, staleTime: 3e7 };
  const { isLoading: isInitialLoading, data: categoryList } = useQuery(
    "categoryArr",
    () => {
      return axios
        .get(
          "https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob"
        )
        .then((res) => res.data.category_list);
    },
    queryConfig
  );

  const { isLoading, data: productList } = useQuery(
    ["productArr", { currentCategory }],
    ({ queryKey }) => {
      const [_key, { currentCategory }] = queryKey;
      return axios
        .get(
          `https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${currentCategory}`
        )
        .then((res) => res.data?.products);
    },
    queryConfig
  );

  useEffect(() => {
    let obj = {};
    categoryList?.forEach((ele) => {
      obj[ele.category_id] = ele.category_name;
    });
    setCategoryObj({ ...obj });
  }, [categoryList]);

  const handleMenu = (id) => {
    setAnchorEl(null);
    if (id) setCurrentCategory(id);
  };

  if (isInitialLoading) return <Loading />;
  return (
    <div className="App">
      <br />
      <Container maxWidth="lg">
        <PerfectScrollbar>
          <div style={{ display: "flex", flexWrap: "nowrap" }}>
            {categoryList.map((ele) => (
              <CategoryTab
                key={ele.category_id}
                title={ele.category_name}
                image={ele.category_image}
                onClick={() => setCurrentCategory(ele.category_id)}
              />
            ))}
          </div>
        </PerfectScrollbar>
        <br />
        <Grid container>
          {isLoading ? (
            <ProductSkeleton viewAll={viewAll} />
          ) : (
            productList.map((item, index) => {
              if (!viewAll && index > 2) return null;
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #f0f0f0",
                    padding: isLargeScreen ? "20px 20px" : "20px 0",
                  }}
                >
                  <ProductTile
                    image={item.image_urls.x300}
                    name={item.name}
                    weight={item.weight + " " + item.weight_unit}
                    isInStock={item.is_in_stock}
                    price={item.price}
                    finalPrice={item.final_price}
                    rating={item.rating}
                    reviewCount={item.review_count}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Button
              variant="outlined"
              size="large"
              style={{
                fontSize: "10px",
                textTransform: "none",
                width: "100%",
                padding: "7px",
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Grid container>
                <Grid item xs={4}>
                  Showing for:
                </Grid>
                <Grid item xs={5} style={{ fontWeight: 900 }}>
                  {categoryObj[currentCategory]}
                </Grid>
                <Grid item xs={3} style={{ textAlign: "end" }}>
                  change
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              size="large"
              style={{
                fontSize: "10px",
                textTransform: "none",
                width: "100%",
                height: "100%",
              }}
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "[-] View Less" : "[+] View More"}
            </Button>
          </Grid>
        </Grid>
        <Menu
          id="categoryMenu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleMenu()}
          style={{ width: "100%" }}
        >
          {categoryList.map((item) => (
            <MenuItem
              key={item.category_id}
              onClick={() => handleMenu(item.category_id)}
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                background:
                  item.category_id === currentCategory
                    ? "#f0f0f0"
                    : "transparent",
              }}
            >
              {item.category_name}
            </MenuItem>
          ))}
        </Menu>
      </Container>
    </div>
  );
}

export default App;
