import './App.css';
import React, { useState, useEffect, useRef } from 'react'
import Converter from './Converter';
import copy from 'clipboard-copy';
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";
import Swal from 'sweetalert2';

const App = () => {

  const initalText = 'Your text Here';
  const [text, setText] = useState(initalText);
  const [textCopy, setTextCopy] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
      if (window.innerWidth < 768) {
        inputRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
        inputRef.current.click();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const validationSchema = yup.object({
    textValue: yup.string()
      .typeError('Please enter a valid text')
      .required('Please enter a text to convert'),
  });

  const formik = useFormik({
    initialValues: {
      textValue: '',
    },
    validationSchema: validationSchema,
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;


  const hundleClick = (e) => {
    e.preventDefault();
    const text = Converter(values.textValue);
    setText(text);
    setTextCopy(textCopy && !textCopy);
  }

  const handleCopy = (e) => {
    e.preventDefault();

    let timerInterval
    Swal.fire({
      title: 'text Copied',
      timer: 800,
      width: 400,
      height: 100,
      color: '#665191',
      customClass: {
        loader: 'loader',
        title: 'swal-title'
      },
      didOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })

    copy(text);
    setTextCopy(true);
  };


  return (
    <>
      <div className="home-page">
        <div className="overlay">
          <div className="container top-container d-flex justify-content-center pt-5">
            <div className="card">
              <div className="card-body p-3">
                <div className="row mt-2">
                  <div className="col-md-2 col-11"></div>
                  <div className="col-md-8 col-11">
                    <h5
                      className={`card-title ${text ? 'text-border' : ''} text-center p-2`}>
                      {text}
                      {text !== initalText && text ? !textCopy
                        ?
                        <button className='clipboard-btn' type='submit' onClick={handleCopy}><FaClipboard className='clipboard' /></button>
                        : <button className='clipboard-btn'><FaClipboardCheck className='clipboard clipboardcheck' /></button> : ''}
                    </h5>
                  </div>
                  <div className="col-md-2 col-11"></div>

                </div>
                <form onSubmit={handleSubmit}>
                  <div className="container">
                    <div className="row justify-content-center mt-3">
                      <div className="d-flex justify-content-end col-md-2 col-2 col-lg-2">
                      </div>
                      <div className="col-md-6 col-8 col-lg-6">
                        <label htmlFor="text" className='form-label'>Text To Convert</label>
                        <input
                          type="text"
                          name="textValue"
                          id='text'
                          placeholder='Your Text Here'
                          className={
                            touched.textValue && errors.textValue
                              ? "form-control is-invalid"
                              : "form-control mb-2"
                          }
                          ref={inputRef}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.textValue}
                        />

                      </div>

                      <div className="d-flex justify-content-start col-md-2 col-2 col-lg-2">
                      </div>

                    </div>

                    <div className="row d-flex justify-content-center">
                      <div className="col-md-12 col-12 d-flex justify-content-center">
                        {touched.textValue && errors.textValue ? (
                          <div className="invalid-feedback d-block text-center">{errors.textValue}</div>
                        ) : null}
                      </div>
                    </div>

                    <div className="row mt-4 d-flex justify-content-center">
                      <div className="col-md-3 col-3 col-lg-3"></div>
                      <div className="col-md-5 col-6 col-lg-5 d-flex justify-content-center">
                        <button className='btn px-5 py-2 generate-btn' onClick={values.textValue ? hundleClick : null} type="submit">Convert Font</button>
                      </div>
                      <div className="col-md-3 col-3 col-lg-3"></div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
        <div className="footer fixed-bottom">

        </div>
      </div>
    </>
  )
}


export default App
