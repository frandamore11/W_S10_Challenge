// components/OrderList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setFilter } from '../state/filterSlice';

export default function OrderList() {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.sizeFilter);

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
      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => {
          const className = `button-filter${size === filter ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setFilter(size))}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}