import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Customer.css';

const CustomerList = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch('/customers.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCustomers(data.customers);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers?.filter((customer) =>
        customer.phoneNumber.includes(searchTerm)
    ) || [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const handleViewDetails = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSaveCustomer = (updatedCustomer) => {
        setCustomers((prevCustomers) => {
            const updatedCustomers = prevCustomers.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            );
            return updatedCustomers;
        });

        setIsModalOpen(false);
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by phone number"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {customers && customers.length > 0 ? (
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.id}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.sex}</td>
                                <td>{customer.age}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>
                                    <button onClick={() => handleViewDetails(customer)}>View/Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No customers found</div>
            )}
            <div className="pagination-container">
                <div>
                    {currentPage > 1 ? (
                        <button onClick={goToPreviousPage}>&lt;</button>
                    ) : (
                        <button disabled>&lt;</button>
                    )}
                    {filteredCustomers.length > currentPage * itemsPerPage ? (
                        <button onClick={goToNextPage}>&gt;</button>
                    ) : (
                        <button disabled>&gt;</button>
                    )}
                </div>
            </div>
            {isModalOpen && selectedCustomer && (
                <Modal onClose={handleModalClose} customer={selectedCustomer} onSave={handleSaveCustomer}>
                    <h3>Customer Details</h3>
                    <p>ID: {selectedCustomer.id}</p>
                    <p>Name: {selectedCustomer.fullName}</p>
                    <p>Sex: {selectedCustomer.sex}</p>
                    <p>Age: {selectedCustomer.age}</p>
                    <p>Address: {selectedCustomer.address}</p>
                    <p>Phone Number: {selectedCustomer.phoneNumber}</p>
                </Modal>
            )}
        </div>
    );
};

export default CustomerList;
