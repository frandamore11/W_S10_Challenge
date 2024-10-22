import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetOrdersQuery } from '../state/pizzaApi';
import { setFilter } from '../state/filterSlice';

export default function OrderList() {
  const {
    data: orders = [],
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersQuery();

  const dispatch = useDispatch();
  const filter = useSelector((state) => state.sizeFilter);

  // Render filter buttons even if loading or error occurs
  const renderFilters = () => (
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
  );

  // Ensure filters are always rendered
  const renderOrders = () => {
    if (ordersLoading) {
      return <p>Loading orders...</p>;
    }

    if (ordersError) {
      return <p>Error loading orders.</p>;
    }

    // Apply the filter to the orders list
    const filteredOrders = orders.filter(
      (order) => filter === 'All' || order.size === filter
    );

    return (
      <ol>
        {filteredOrders.map((order) => {
          const toppingsCount = Array.isArray(order.toppings) ? order.toppings.length : 0;

          return (
            <li key={order.id}>
              <div>
                {order.customer || 'Unknown'} ordered a size {order.size} with{' '}
                {toppingsCount > 0
                  ? `${toppingsCount} ${toppingsCount === 1 ? 'topping' : 'toppings'}`
                  : 'no toppings'}
              </div>
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      {renderOrders()}
      {renderFilters()} {/* Filters rendered with orders */}
    </div>
  );
}