import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModifiedButton from '../components/Button';

const FormButton = (props) => {
    const { disabled, ...others } = props;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <ModifiedButton 
            disabled={!mounted || disabled}
            typed="submit"
            variant="contained"
            {...others}
        />
    )
}

FormButton.propTypes = {
    disabled: PropTypes.bool,
    mounted: PropTypes.bool,
}

export default FormButton;