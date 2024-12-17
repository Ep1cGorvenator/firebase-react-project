import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import fireDb from "../firebase";
import { ref, push, onValue, update } from "firebase/database";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const history = useNavigate();
  
  const { name, email, contact } = state;

  const {id} = useParams();

  // retrive data from database
  useEffect(() => {
    const contactsRef = ref(fireDb, "contact");
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      unsubscribe();
      setData({});
    };
  }, [id]);

  //
  useEffect(() => {
    if (id) {
      setState({...data[id]});
    } else {
      setState({...initialState});
    }

    return () => {
      setState({...initialState});
    }
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !email && !contact) {
      toast.error("Please provide values for all fields of the Contact.");
    } else if (!name || !email || !contact) {
      if (!name) {
        toast.error("Please provide the Name of the Contact.");
      }
      if (!email) {
        toast.error("Please provide the Email of the Contact.");
      }
      if (!contact) {
        toast.error("Please provide the Contact No. of the Contact.");
      }
    } else {
      if (!id) {
        const contactRef = ref(fireDb, "contact");
        push(contactRef, state)
          .then(() => {
            toast.success(`Contact ${name} Added Successfully!`);
          })
          .catch((err) => {
            toast.error(err);
          });
      } else {
        const contactRef = ref(fireDb, `contact/${id}`);
        update(contactRef, state)
          .then((ref) => {
            toast.success(`Contact ${name} Updated Successfully!`);
          })
          .catch((err) => {
            toast.error(err);
          });
      }
      setTimeout(() => history("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value})
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ... "
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ... "
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact: </label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact No. ... "
          value={contact || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <button className="btn btn-edit" style={{width: "100%"}}>Go Back</button>
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
