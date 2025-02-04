import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useFetchCartQuery, useUpdateCartQuantityMutation } from "../../src/pages/redux/api/cartSlice";
import { useSelector } from "react-redux";
import Paypal from "./paypal";
import { toast } from "react-toastify";
import { useAddCartMutation } from "../pages/redux/api/cartSlice";

function Cart() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: cartProducts, isLoading, error } = useFetchCartQuery(userInfo?._id);
  const [updateCartQuantity] = useUpdateCartQuantityMutation();

  const [loadError, setLoadError] = useState("");
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);

  useEffect(() => {
    if (error) {
      setLoadError(error?.data?.message || error.error || "Failed to fetch cart");
    }
  }, [error]);

  if (isLoading)
    return (
      <p className="flex flex-col justify-center text-center text-5xl text-bold min-h-full items-center">
        Loading...
      </p>
    );
    
  const calculateTotal = () => {
    return (
      cartProducts?.reduce(
        (total, item) =>
          total + (item.productId.price || 0) * (item.quantity || 1),
        0
      )?.toFixed(2) || "0.00"
    );
  };

  const handleOnClickPay = () => {
    setIsPaymentStarted(true);
  };

  const renderPaymentComponent = () => {
    if (isPaymentStarted) {
      return <Paypal value={calculateTotal()} />;
    }
    return (
      <Button className="w-full bg-pink-600" onClick={handleOnClickPay}>
        Proceed to Checkout
      </Button>
    );
  };

  const updateQuantity = async (item, quantity) => {
    try {
      const result = await updateCartQuantity({
        userId: userInfo._id,
        productId: item.productId._id,
        quantity: quantity
      }).unwrap();
      
      if (result.message === 'Cart updated successfully') {
        toast.success('Cart updated successfully');
        return;
      }
      
      if (!result.success && result.error) {
        toast.error('Failed to update quantity:', result.error);
      }
    } catch (err) {
      const errorMessage = err.data?.message || err.error || 'Failed to update quantity';
      toast.error('Failed to update quantity:', errorMessage);
    }
  };

  const handleQuantityChange = (item, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(item, quantity);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {loadError || !cartProducts || cartProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          {loadError || "Your cart is empty"}
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartProducts.map((item) => (
              <div
                key={item.id || item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {item.productId.name || "Unnamed Product"}
                  </h3>
                  <p className="text-gray-600">
                    ${(item.productId.price || 0).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                    className="w-16 text-center no-spin"
                    min="1"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">${calculateTotal()}</span>
            </div>
            {renderPaymentComponent()}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
