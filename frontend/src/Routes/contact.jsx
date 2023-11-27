import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import * as yup from 'yup';
import { useFormik } from 'formik';

const Contact = () => {
  const form = useRef(null);
  const [emailMessageSent, setEmailMessageSent] = useState("");
  const [popup, setPopup] = useState("");

  let schema = yup.object({
    user_email: yup.string().email('Please enter a valid email').required('Email is a required field *'),
    user_name: yup.string().required('Name is a required field *').min(3, 'Name must be at least 3 characters').max(10, 'Name is too long'),
    user_message: yup.string().required("The message field is required *"),
  });

  const sendEmail = () => {
    emailjs
      .sendForm('service_4n10yr7', 'template_89p0tjf', form.current, 'LW3r27bFaCZINQrEn')
      .then(() => {
        setEmailMessageSent('The Message Sent Successfully..!');
        setPopup('popup-show');
        form.current.reset();
      })
      .catch(() => {
        setEmailMessageSent('Something Went Wrong..!');
        setPopup('popup-show');
      });
  };

  let { values, handleChange, errors, handleSubmit, touched, resetForm } = useFormik({
    initialValues: {
      user_name: '',
      user_email: '',
      user_message: '',
    },
    validationSchema: schema,
    onSubmit: () => {
      sendEmail();
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (emailMessageSent !== 'The Message Sent Successfully..!') {
        setPopup('popup');
      } else {
        resetForm();
        setPopup('popup');
      }
    }, 5000);
  }, [popup]);

  return (
    <>
      <div id="contact" className="row w-100 mt-5">
        <div className="col mt-4">
          <img src="/public/contact.svg" className="col img-fluid" alt="Contact Mockup" />
        </div>
        <div className="col p-4">
          <form ref={form} onSubmit={handleSubmit} className="contact-form" >
            <div className='form-group'>
              <label htmlFor="user_name" className='form-label mt-4'>Name*</label>
              <input
                onChange={handleChange}
                value={values.user_name}
                
                type="text"
                id="user_name"
                name="user_name"
                className="form-control contact-input "
              />
              {errors.user_name && touched.user_name && <small className="text-danger">{errors.user_name}</small>}
            </div>
            <div className='form-group'>
              <label htmlFor="user_email" className='form-label mt-4'>Email Address*</label>
              <input
                onChange={handleChange}
                value={values.user_email}
                type="email"
                id="user_email"
                name="user_email"
                className="form-control contact-input "
              />
              {errors.user_email && touched.user_email && <small className="text-danger">{errors.user_email}</small>}
            </div>
            <div className='form-group'>
              <label htmlFor="user_message" className='form-label mt-4'>Message *</label>
              <textarea
                onChange={handleChange}
                value={values.user_message}
                type="text"
                id="user_message"
                name="user_message"
                className="form-control contact-input "
              ></textarea>
              {errors.user_message && touched.user_message && <small className="text-danger">{errors.user_message}</small>}
            </div>
            <button type="submit" className="btn btn-sm d-block btn-outline-light">
              Send Email
            </button>
          </form>
        </div>
      </div>
      <div className={`${popup} bg-light ${emailMessageSent === 'The Message Sent Successfully..!' ? "text-success " : "text-danger"} `}>
        <p>{emailMessageSent}</p>
      </div>
    </>
  );
};

export default Contact;
