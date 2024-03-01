import React from 'react';
import './ErrorPage.scss';
import { Alert } from '@mui/material';

const ErrorPage = () => (
  <Alert variant="outlined" severity="error">
      Page Not Found
    </Alert>
);

ErrorPage.propTypes = {};

ErrorPage.defaultProps = {};

export default ErrorPage;
