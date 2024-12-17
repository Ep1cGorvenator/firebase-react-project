import React from 'react';
import "./About.css";
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <div className="about" style={{ marginTop: "150px" }}>
      <h2>
        This is React Contact Management System Application with React using
        Firebase
      </h2>
      <p>
        This application allows the user to add a contact of their choise with
        these details:
      </p>
      <p>1. Name of the contact.</p>
      <p>2. Email Address of the contact.</p>
      <p>3. Contact Number  of the contact.</p>
      <Link to="/">
        <button className='btn btn-edit'>Go Back</button>
      </Link>
    </div>
  );
}

export default About