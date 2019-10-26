import React, { useState, useCallback } from 'react';
import CheckBox from '@material-ui/core/CheckBox';


const ModifiedCheckBox = (props) => {
    
    const [checked, setChecked] = useState(false);
    const onClickCheckBox = useCallback((e) => {
        if(checked){
            setChecked(false);
        } else {
            setChecked(true);
        }
    }, [checked]);

    console.log(props.meta);

    return(
        <>
            <CheckBox
                onClick={onClickCheckBox}
                checked={checked}
                inputProps={{
                    value:checked
                }}
                {...props}
            />
            <span>
                {props.label}
            </span>
            {props.meta.error && props.meta.touched ? <span>Required</span> : ''}
        </>
    )
}

export default ModifiedCheckBox;
