import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MuiTextField from '@material-ui/core/TextField';
import { capitalize } from '@material-ui/core/utils';

const ModifiedTextField = styled(MuiTextField).attrs((props) => ({
    SelectProps: {
        ...props.SelectProps,
    }
}))`
    .MuiSelect-select {
        height: auto;
        border-radius: 0;
    };
    .MuiSelect-icon {
        top: 50%;
        margin-top: -12px;
    }
`;

const TextField = ({ noBorder = false, size = 'medium', ...props }) => {
    return (
        <ModifiedTextField
            {...props}/>
    )
}

TextField.PropTypes = {
    noBorder: PropTypes.bool,
    SelectProps: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
};

export default TextField;