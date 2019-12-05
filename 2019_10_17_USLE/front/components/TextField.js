import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MuiTextField from '@material-ui/core/TextField';

import { capitalize } from '@material-ui/core/utils';

const ModifiedTextField = styled(MuiTextField).attrs((props) => ({
    InputProps : {
        ...props,
        disableUnderline: true,
    },
    InputLabelProps : {
        shrink: true,
    }
}))`

    .MuiInput-root {
        padding: 0;
        label +  {
            margin-top: ${props => props.theme.spacing(3)}px;
        }
    }

    .MuiInput-input {
        ${props => (props.size === 'small') && `
            font-size: 14px;
            padding: ${props.theme.spacing(1)}px;
            width: calc(100% - ${props.theme.spacing(2)}px);
        `};
        ${props => (props.size === 'medium' || props.size === undefined) && `
            font-size: 16px;
            padding: ${props.theme.spacing(2)}px;
            width: calc(100% - ${props.theme.spacing(4)}px);
        `};
        ${props => (props.size === 'large') && `
            font-size: 18px;
            padding: 22px;
            width: calc(100% - ${22 * 2}px);
        `};
        ${props => (props.size === 'xlarge') && `
            font-size: 20px;
            padding: 25px;
            width: calc(100% - ${25 * 2}px);
        `};
        ${props => (!props.noBorder) &&`
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-top: 10px;
        :focus, :hover {
            border-color: ${props.theme.palette.secondary.main}
        }
        `}
    }
    .MuiInputLabel-root {
        font-size: 18px;
    }
    .MuiSelect-select {
        height: auto;
        border-radius: 0;
    };
    .MuiSelect-icon {
        top: 50%;
        margin-top: -12px;
    }
`;

const TextField = (props) => {
    const { noBorder, SelectProps, size, ...others } = props;
    return (
        <ModifiedTextField
            {...props}
            />
    )
}

TextField.propTypes = {
    noBorder: PropTypes.bool,
    SelectProps: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
};

export default TextField;