import React, { useState, useCallback } from 'react';
import CheckBox from '@material-ui/core/CheckBox';


const ModifiedCheckBox = (props) => {
    const [checked, setChecked] = useState([1]);
    const onClickCheckBox = useCallback((value) => {
        const targetIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if(targetIndex === 0) {
            newChecked.splice(targetIndex, 1);
        } else if(targetIndex !== 0) {
            newChecked.push(1);
        }
        setChecked(newChecked);
        console.log(checked[0]);
    }, [checked]);
    
    return(
        <>
            <CheckBox
                onClick={() => onClickCheckBox(1)}
                checked={checked.indexOf(1) !== -1 ? true : false}
                inputProps={{
                    value:checked.indexOf(1) !== -1 ? true : ''
                }}
                {...props}
            />
            <span>
                {props.label}
            </span>
            {props.meta.error && props.meta.touched ? <div><span>Required</span></div> : ''}
        </>
    )
}

export default ModifiedCheckBox;
