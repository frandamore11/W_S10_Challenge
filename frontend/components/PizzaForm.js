// components/PizzaForm.js
import React, { useState } from 'react';
import { useCreateOrderMutation } from '../state/pizzaApi';

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
};

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, size, ...toppings } = formState;
    const selectedToppings = Object.keys(toppings).filter((key) => toppings[key]);

    const orderData = {
      fullName,
      size,
      toppings: selectedToppings,
    };

    console.log('Order Data:', orderData);

    try {
      await createOrder(orderData).unwrap();
      setFormState(initialFormState);
    } catch (err) {
      // Error is already handled below
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && (
        <div className="failure">Order failed: {error.data?.message}</div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            name="size"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            name="1"
            type="checkbox"
            checked={formState['1']}
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            name="2"
            type="checkbox"
            checked={formState['2']}
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            name="3"
            type="checkbox"
            checked={formState['3']}
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            name="4"
            type="checkbox"
            checked={formState['4']}
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            name="5"
            type="checkbox"
            checked={formState['5']}
            onChange={handleChange}
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}