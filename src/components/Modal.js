import React, { useState } from 'react';

const Modal = ({ onClose, customer, onSave }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState(customer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(updatedCustomer);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {customer && (
          <>
            <h3>Customer Details</h3>
            <p>ID: {customer.id}</p>
            <p>
              Name:
              <input
                type="text"
                name="fullName"
                value={updatedCustomer.fullName}
                onChange={handleChange}
              />
            </p>
            <p>
              Sex:
              <input
                type="text"
                name="sex"
                value={updatedCustomer.sex}
                onChange={handleChange}
              />
            </p>
            <p>
              Age:
              <input
                type="text"
                name="age"
                value={updatedCustomer.age}
                onChange={handleChange}
              />
            </p>

            <p>
              Address:
              <input
                type="text"
                name="address"
                value={updatedCustomer.address}
                onChange={handleChange}
              />
            </p>
            <p>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={updatedCustomer.phoneNumber}
                onChange={handleChange}
              />
            </p>
            <button onClick={handleSave}>Save</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
