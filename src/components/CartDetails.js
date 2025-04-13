import React, { useEffect, useState } from "react";
import "../styles/cartstyle.css";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, {
  addToCart,
  emptyCartItem,
  removeSingleItems,
  removeToCart,
} from "../redux/features/cartSlice";
import toast from "react-hot-toast";

const CartDetails = () => {
  const { carts } = useSelector((state) => state.allCart);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  //Total Price
  useEffect(() => {
    const totalPrice = carts.reduce(
      (acc, item) => acc + item.price * item.qnty,
      0
    );
    setTotal(totalPrice);
  }, [carts]);

  //Total Quantity
  useEffect(() => {
    const tQnty = carts.reduce((acc, item) => acc + item.qnty, 0);
    setQuantity(tQnty);
  }, [carts]);

  const dispatch = useDispatch();
  //add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  //Remove from Cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item removed from your cart");
  };

  //remove Single item
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleItems(e));
  };

  //Empty Cart
  const emptyCart = () => {
    dispatch(emptyCartItem());
    toast.success("Your Cart is empty");
  };
  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation({carts.length})
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={() => emptyCart()}
                  >
                    <i className="fa fa-trash-alt me-2"></i>
                    <span>Empty Cart</span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart">
                            <p>Your cart is empty</p>
                          </i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        <span id="amount" className="amount">
                          Total Amt
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                className="prdct-delete"
                                onClick={() => handleDecrement(data.id)}
                              >
                                <i className="fa fa-trash-alt mr-2"></i>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.imgdata} alt="" />
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.dish}</p>
                              </div>
                            </td>
                            <td>{data.price}</td>
                            <td>
                              <div className="prdct-qty-container">
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={() => handleSingleDecrement(data)}
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <input
                                  text="text"
                                  className="qty-input-box"
                                  value={data.qnty}
                                  disabled
                                  name=""
                                  id=""
                                />
                                <button
                                  className="prdct-qty-btn"
                                  type="button"
                                  onClick={() => handleIncrement(data)}
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              {data.qnty * data.price}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Item in cart<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{quantity}</span>
                      </th>
                      <th className="text-right">
                        Total price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{total}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
