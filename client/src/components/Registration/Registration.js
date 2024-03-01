import React, { useEffect, useState } from 'react';
import './Registration.scss';
import { Box, Container } from '@mui/material';
import { Mapper } from '../../util/Mapper';

const Registration = () => {
  let [design, setDesign] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5500/api/view/registration")
      .then(res => res.json())
      .then(data => { setDesign(data.design) });
  }, [])

  return (
    <div className="Registration">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {
            design && design.map(element => Mapper(element))
          }
        </Box>
      </Container>
    </div>
  )
};

Registration.propTypes = {};

Registration.defaultProps = {};

export default Registration;
