import React, { useState, useCallback } from 'react';
import Checkbox from '@material-ui/core/Checkbox';


const ModifiedCheckBox = (props) => {
    const {input:{value}} = props;
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
    }, [checked]);
    
    return(
        <>
            <Checkbox
                onClick={() => onClickCheckBox(1)}
                // checked={checked.indexOf(1) !== -1 ? true : false}
                checked={value ? true : false}
                inputProps={{
                    value:checked.indexOf(1) !== -1 ? 'check' : '',
                    ...props.inputProps
                }}
                {...props}
            />
            <span>
                {props.label}
            </span>
            {props.meta.error && props.meta.touched ? <div><span style={{color:'red'}}>Please read and check at this box</span></div> : ''}
        </>
    )
}

export default ModifiedCheckBox;
