import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useFetchCartQuery } from "../../src/pages/redux/api/cartSlice";
import { useSelector } from 'react-redux';

function Cart() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: cartProducts, isLoading, error } = useFetchCartQuery(userInfo._id);
  // Update cart quantity
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cart</p>;

  // Calculate total price
  const calculateTotal = () => {
    return cartProducts?.reduce(
      (total, item) => total + (item.productId.price || 0) * (item.quantity || 1),
      0
    ).toFixed(2);
  };
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartProducts?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartProducts.map((item) => (
              <div key={item.id || item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.productId.name || "Unnamed Product"}</h3>
                  <p className="text-gray-600">${(item.productId.price || 0).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    // onClick={() => removeFromCart(item.id)}
                  >
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
            <Button className="w-full bg-pink-600">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
