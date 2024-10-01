import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import './Contact.css'


function Contact() {
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    comments: "",
  });

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitUserData = (e) => {
    e.preventDefault();
    const { fname, lname, mobile, email, comments } = inputData;

    if (fname === "") {
      toast.error("First name is required");
    } else if (lname === "") {
      toast.error("Last name is required");
    } else if (mobile === "") {
      toast.error("Phone is required");
    } else if (email === "") {
      toast.error("Email is required");
    } else if (comments === "") {
      toast.error("Comments/queries are required");
    } else {
      toast.success("Query Form Submitted Successfully");
    }
  };

  return (
    
    
    <div className="container mb-3">
      <p className="mt-2 navhis">
        <Link to={'/'} className="text-decoration-none">HOME</Link> / <Link to={'/contact'} className="text-decoration-none">CONTACT US</Link>
      </p>
      <h3 className="text-center">Contact Us</h3>
      <ul className="list-unstyled mt-3">
        <li className="licolor">We're happy to answer queries or help you with returns.</li>
        <li className="licolor">Please fill out the form below if you need assistance.</li>
      </ul>
      <form onSubmit='#'> {/* Updated the form's onSubmit handler */}
        <div className="row">
          <div className="col col-md-4 col-sm-12">
            <label htmlFor="fname">First Name</label> {/* Updated the label's htmlFor attribute */}
            <input type="text" className="form-control" placeholder="" name="fname" onChange={setInputValue} />
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="lname">Last Name</label> {/* Updated the label's htmlFor attribute */}
            <input type="text" className="form-control" placeholder="" name="lname" onChange={setInputValue} />
          </div>
        </div>
        <div className="row">
          <div className="col col-md-4 col-sm-12">
            <label htmlFor="mobile">Phone Number</label> {/* Updated the label's htmlFor attribute */}
            <input type="text" className="form-control" placeholder="" name="mobile" onChange={setInputValue} />
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="email">Email Address</label> {/* Updated the label's htmlFor attribute */}
            <input type="text" className="form-control" placeholder="" name="email" onChange={setInputValue} />
          </div>
        </div>
        <div className="row">
          <div className="col col-md-8 col-sm-12">
            <div className="mb-3">
              <label htmlFor="comments" className="form-label">Comments/Queries</label>
              <textarea className="form-control" rows="3" name="comments" onChange={setInputValue}></textarea>
            </div>
          </div>
        </div>
        <button type="button" className="margincenter p-2 " onClick={submitUserData}>SUBMIT FORM</button>
      </form>
      <ToastContainer position="top-center" />
    </div>
   
  );
}

export default Contact;
