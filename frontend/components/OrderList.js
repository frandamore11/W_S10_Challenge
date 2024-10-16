// components/OrderList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';

export default function OrderList() {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();
  const dispatch = useDispatch();

  // We'll handle the size filter in Task 5
  const filter = useSelector((state) => state.sizeFilter || 'All');

  const filteredOrders = orders.filter(
    (order) => filter === 'All' || order.size === filter
  );

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <div>
              {order.fullName} - Size: {order.size} - Toppings:{' '}
              {order.toppings.join(', ')}
            </div>
          </li>
        ))}
      </ol>
      {/* Size filter will be implemented in Task 5 */}
    </div>
  );
}