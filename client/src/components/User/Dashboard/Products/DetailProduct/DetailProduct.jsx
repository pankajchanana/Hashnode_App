import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { databases } from "../../../../../services/appwriteConfig";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
// import { getProductAction } from "../../redux/actions/getProductAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import { initialProducts } from "../../../constants/constants";
import { DataContext } from "../../../../utilities/ContextStore";
import { v4 as uuid4 } from "uuid";
import { Query } from "appwrite";
import {
  checkIfProductAlreadyInCart,
  fetchRecommendedProducts,
  listCurrentUserCartItems,
  listDefaultProducts,
} from "../../../../../redux/actions/productsAction";
import Carousel from "react-multi-carousel";
import ProductList from "../ProductList";

const { VITE_DATABASE_ID, VITE_CARTS_TABLE_ID } = import.meta.env;

function DetailProduct() {
  const { id } = useParams();
  const secretKey = sessionStorage.getItem("secret_key");

  const navigate = useNavigate();
  const { setCartItemsData, cartItemsData, itemCount, setLoginModalOpen } =
    React.useContext(DataContext);
  const dispatch = useDispatch();
  const [recommendedProductsList, setRecommendedProductsList] = useState();

  const { itemPresentInCart, initialProducts, recommendedProducts } =
    useSelector((state) => state.products);
  let product = initialProducts.find((q) => q.product_id === id);
  useEffect(() => {
    dispatch(checkIfProductAlreadyInCart(id));
    dispatch(listDefaultProducts());
    dispatch(fetchRecommendedProducts(product?.product_name));
  }, []);

  useEffect(() => {
    setRecommendedProductsList(recommendedProducts);
  }, [recommendedProducts]);
  const ImageGrid = styled(Box)`
    margin: 30px 0 0 40px;
    display: flex;
  `;

  const Img = styled("img")`
    padding: 30px;
    height: 500px;
  `;

  const ButtonWrapper = styled(Box)`
    display: flex;
    justify-content: center;
  `;

  const PriceWrapper = styled(Box)`
    display: flex;
    align-items: center;
  `;

  const OffersWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
  `;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };
  const handleAddtoCartItems = async (e) => {
    if (!!secretKey && !itemPresentInCart) {
      setCartItemsData({
        ...cartItemsData,
        product,
      });
      await databases
        .createDocument(VITE_DATABASE_ID, VITE_CARTS_TABLE_ID, uuid4(), {
          user_id: sessionStorage.getItem("secret_key"),
          product_id: product.product_id,
          product_count: "1",
          customer_name: "cherit",
          product_price: product.product_price,
          seller_id: product.seller_id,
        })
        .then((res) => {
          navigate("/viewcart/" + secretKey);
          dispatch(listCurrentUserCartItems());
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (!!!secretKey) {
      setLoginModalOpen(true);
    } else if (itemPresentInCart) {
      navigate("/viewcart/" + secretKey);
      dispatch(listCurrentUserCartItems());
    }
  };

  return (
    <Box>
      <Box>
        <ImageGrid>
          <Box>
            <Img src={product?.product_img} />
            <ButtonWrapper>
              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                sx={{
                  background: "#ff9f00",
                  width: "170px",
                  padding: "15px 10px 15px 10px",
                  marginRight: 1,
                }}
                onClick={handleAddtoCartItems}
              >
                {itemPresentInCart ? "Go to Cart" : "Add to Cart"}
              </Button>

              <Button
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                sx={{
                  background: "#fb641b",
                  width: "170px",
                  padding: "15px 10px 15px 10px",
                }}
              >
                Buy Now
              </Button>
            </ButtonWrapper>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ ml: 20, fontSize: 18 }}>
              {product?.product_name}
            </Typography>
            <Typography sx={{ ml: 20, mt: 2, color: "green" }}>
              {/* {product?.discount} */}Extra 21% off
            </Typography>
            <PriceWrapper>
              <Typography sx={{ ml: 20, mt: 2, fontSize: 28, fontWeight: 600 }}>
                ₹{product?.product_price}
              </Typography>
              <Typography
                sx={{
                  ml: 2,
                  mt: 2,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#878787",
                  textDecoration: "line-through",
                }}
              >
                {/* ₹{product?.price?.mrp} */}20,000
              </Typography>
              <Typography
                sx={{
                  ml: 2,
                  mt: 2,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "green",
                }}
              >
                {/* ₹{product?.price?.discount} */}20%
              </Typography>
            </PriceWrapper>
            <Typography sx={{ ml: 20, fontSize: 13 }}>
              + ₹49 Secured Packaging fee
            </Typography>
            <OffersWrapper>
              <Typography sx={{ ml: 20, mt: 3, fontWeight: 600, fontSize: 16 }}>
                Available Offers
              </Typography>
              <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
                <LocalOfferIcon sx={{ mr: 1, color: "green" }} />
                <span style={{ fontWeight: 600, marginRight: 10 }}>
                  {" "}
                  Bank Offer{" "}
                </span>{" "}
                10% off on Bank of Baroda Credit Card EMI Transactions, up to
                ₹1,000 on orders of ₹5,000 and above
              </Typography>
              <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
                <LocalOfferIcon sx={{ mr: 1, color: "green" }} />
                <span style={{ fontWeight: 600, marginRight: 10 }}>
                  {" "}
                  Bank Offer{" "}
                </span>{" "}
                10% off on DBS Bank Credit Card Transactions, up to ₹750. On
                orders of ₹2,000 and above
              </Typography>
              <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
                <LocalOfferIcon sx={{ mr: 1, color: "green" }} />
                <span style={{ fontWeight: 600, marginRight: 10 }}>
                  {" "}
                  Bank Offer{" "}
                </span>{" "}
                10% off on IDFC FIRST Bank Credit Card EMI Transactions, up to
                ₹1,000 on orders of ₹5,000 and above
              </Typography>
              <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
                <LocalOfferIcon sx={{ mr: 1, color: "green" }} />
                <span style={{ fontWeight: 600, marginRight: 10 }}>
                  {" "}
                  Special Price{" "}
                </span>{" "}
                Get extra ₹3000 off (price inclusive of cashback/coupon)
              </Typography>
            </OffersWrapper>
            <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
              <span style={{ fontWeight: 600, marginRight: 10 }}>
                {" "}
                Delivery{" "}
              </span>{" "}
              Delivery by 3 Apr, Monday
            </Typography>
            <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
              <span style={{ fontWeight: 600, marginRight: 10 }}>
                {" "}
                Warranty{" "}
              </span>
              No Warranty
            </Typography>

            <Typography sx={{ ml: 20, mt: 3, fontSize: 14, display: "flex" }}>
              <span style={{ fontWeight: 600, marginRight: 10 }}> Seller </span>
              MYTHANGLORYRetail
            </Typography>
          </Box>
        </ImageGrid>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "20px",
            marginTop: "50px",
            padding: 2,
            fontWeight: 600,
          }}
        >
          People also Bought
        </Typography>
        <Carousel
          responsive={responsive}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          swipeable={false}
          draggable={false}
        >
          {recommendedProductsList!==undefined && recommendedProductsList.map((item, index) => {
            return <ProductList item={item} />;
          })}
        </Carousel>
      </Box>
    </Box>
  );
}

export default DetailProduct;
