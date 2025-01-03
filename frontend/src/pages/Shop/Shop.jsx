import React from 'react';
import Button from '../../components/Button';

import Card from '../../components/Button';



const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 2,
    name: "Wireless Speaker",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=400"
  }
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      

      {/* Main Content */}
      <main className="ml-16 p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-semibold">Special Products</h1>
          <Button>Shop</Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Card key={product.id}>
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-white/60">${product.price}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-white/60 py-12">
              No products found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

