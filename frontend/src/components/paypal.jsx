// filepath: /d:/swoc/ShopSphere/frontend/src/components/paypal.jsx
import React, { useRef, useEffect } from "react";

export default function Paypal({value}) {
  const paypal = useRef();

  useEffect(() => {
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "",
                  amount: {
                    currency_code: "USD",
                    value: value,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    } else {
      console.error("PayPal SDK not loaded");
    }
  }, []);

  return <div ref={paypal}></div>;
}