import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '../components/TextField';

const StyledTextField = styled(TextField)`
`;

const RFTextField = ({ ...props }) => {
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
            InputProps,
          }}
          helperText={touched ? error || submitError : ''}
          {...input}
          {...other}/>
        
    )
}

export default RFTextField;