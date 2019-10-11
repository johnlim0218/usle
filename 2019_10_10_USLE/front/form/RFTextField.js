import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '../components/TextField';

const StyledTextField = styled(TextField)`
`;

const RFTextField = (props) => {
    const {
      autoComplete,
      input,
      InputProps,
      meta: { touched, error, submitError },
      ...other
    } = props;
    
    return(
        <TextField
          error={Boolean(touched && (error || submitError))}
          InputProps={{
            inputProps: {
              autoComplete
            },
            ...InputProps,
          }}
          helperText={touched ? error || submitError : ''}
          {...input}
          {...other}/>
        
    )
}

RFTextField.propTypes = {
  autoComplete: PropTypes.string,
  input: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
};


export default RFTextField;