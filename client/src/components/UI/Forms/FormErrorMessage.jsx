import React from "react";
import { ErrorMessage } from "formik";
import PropTypes from 'prop-types'

const FormErrorMessage = ({ name }) => {
  return (
    <div style={{ color: "red" }}>
      <br />
      <ErrorMessage name={name} />
    </div>
  );
};

export default FormErrorMessage;

FormErrorMessage.propTypes = {
  name: PropTypes.string.isRequired
}