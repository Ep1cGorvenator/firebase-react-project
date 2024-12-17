import React, { useState, useEffect } from 'react';
import fireDb from '../firebase';
import { Link } from 'react-router-dom';
import "./Home.css";
import { onValue, ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const contactsRef = ref(fireDb, 'contact');
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    })

    return () => {
      unsubscribe();
      setData({});
    };
  }, []);

  const onDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete this contact, ${name}?`)) {
      const contactsRef = ref(fireDb, `contact/${id}`);
      remove(contactsRef).then(() => {
        toast.success(`Contact ${name} deleted successfully.`);
      }).catch((err) => {
        toast.error(err);
      });
    }
  }

  return (
    <div style={{ margin: "100px" }}>
      <h1 style={{ textDecoration: "underline", width: "800px", borderCollapse: "collapse", margin: "auto", padding: "10px"}}>
        Firebase Database Table Display:
      </h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(id, data[id].name)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home