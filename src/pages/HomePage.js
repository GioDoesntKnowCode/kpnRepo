import React from 'react';
import './HomePage-Style.css';
import CustomerList from '../components/Customer';
import Github from '../components/Github';

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>KPN Customer List</h1>
      </header>
      <section>
        <h2>Explore my beautiful Customer list</h2>
        <div className="service-items">
          <CustomerList/>
        
        </div>
      </section>
        <Github/>

      <footer>
        <p>&copy; {new Date().getFullYear()} Giovanni Fernando</p>
      </footer>
    </div>
  );
};

export default HomePage;
