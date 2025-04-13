import React, { useState } from "react";
import "../styles/style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardsData from "./CardData";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Home = () => {
  const [cardData, setCardData] = useState(CardsData);
  const dispatch = useDispatch();

  //add to cart
  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added in your cart");
  };
  return (
    <>
      <section className="inteam_section mt-4 container">
        <h2 className="px-4" style={{ fontWeight: "400" }}>
          Resturants Open in Delhi Now
        </h2>
        <div className="row mt-2 d-flex justify-content-around align-itmes-center">
          {cardData.map((card, index) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="hove mb-4"
                >
                  <Card.Img variant="top" className="cd" src={card.imgdata} />

                  <div className="card_body">
                    <div className="upper_data d-flex justify-content-between align-items-center">
                      <h4 className="mt-2">{card.dish}</h4>
                      <span>{card.rating}&nbsp;⭐</span>
                    </div>
                    <div className="lower_data d-flex justify-content-between">
                      <h5>{card.address}</h5>
                      <span>{card.price}</span>
                    </div>
                    <div className="extra"></div>
                    <div className="last_data d-flex justify-content-between align-items-center">
                      <img className="limg" src={card.arrimg} alt="" />
                      <Button
                        style={{
                          width: "150px",
                          background: "#ff3054db",
                          border: "none",
                        }}
                        variant="outline-light"
                        className="mt-2 mb-2"
                        onClick={() => send(card)}
                      >
                        Add to cart
                      </Button>
                      <img className="laimg" src={card.delimg} alt="" />
                    </div>
                  </div>
                </Card>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
