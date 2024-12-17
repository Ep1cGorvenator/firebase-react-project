import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./View.css";
import fireDb from '../firebase';
import {ref, get} from "firebase/database";

const View = () => {
  const [user, setUser] = useState({});

  const {id} = useParams();

  useEffect(() => {
    const contactRef = ref(fireDb, `contact/${id}`);
    get(contactRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUser({...snapshot.val()});
      } else {
        setUser({});
      }
    })
  }, [id]);
  
  return (
    <div style={{ margin: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact No.: </strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className='btn btn-edit'>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default View