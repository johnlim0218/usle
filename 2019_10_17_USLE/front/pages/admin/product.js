import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Field, Form, FormSpy } from 'react-final-form';

import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

import { required } from '../../form/validation';
import RFTextField from '../../form/RFTextField';
import FormFeedback from '../../form/FormFeedback';
import FormButton from '../../form/FormButton';
import AddOptionDialog from '../../components/Admin/AddOptionDialog';
import { NEW_PRODUCT_POST_REQUEST } from '../../reducers/admin/adminProductReducer';
import { StyledMenuItem, StyledSelect } from '../product';
import { BRANDS_LOAD_REQUEST } from '../../reducers/admin/adminBrandReducer';
import { CATEGORIES_LOAD_REQUEST } from '../../reducers/admin/adminCategoryReducer';


const StyledFormControl = styled(FormControl)`
    margin-left: ${props => props.theme.spacing(0)}px;
    margin-right: ${props => props.theme.spacing(3)}px;
    margin-bottom: ${props => props.theme.spacing(1)}px;
    min-width: 120px;
`;

const StyledStyledSelect = styled(StyledSelect)`
    padding: ${props => props.theme.spacing(0)}px;;
`

const StyledTextField = styled(RFTextField)`
    margin-bottom: ${props => props.theme.spacing(0)}px;;
`;

const StyledButton = styled(Button)`
    margin: ${props => props.theme.spacing(2)}px;
`

const StyledDivRichEditorRoot = styled.div`
    background: #fff;
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 15px;
`;

const StyledDivRichEditorContols = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
`;

const StyledSpanStyledButton = styled.span`
    color: ${props => props.active ? '#5890ff' : '#999'};
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
`;

const StyledButtonSubmit = styled.button`
    margin-top: 50px;
`;

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const Product = () => {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [option, setOption] = useState([]);
    const [optionDialog, setOptionDialog] = useState(false);
    const [editorState, seteditorState] = useState(
        EditorState.createEmpty()
    );
    const { brands } = useSelector((state) => state.adminBrandReducer);
    const { categories } = useSelector((state) => state.adminCategoryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: CATEGORIES_LOAD_REQUEST,
            data: {
                requestType: "name",
            }
        })
        dispatch({
            type: BRANDS_LOAD_REQUEST,
            data: {
                requestType: "name",
            }
        })
    }, []);
    
    const onChangeCategory = useCallback((e) => {
        setCategory(e.target.value);
    }, [category]);

    const onChangeBrand = useCallback((e) => {
        setBrand(e.target.value);
    }, [brand]);

    const onClickOption = useCallback((e) => {
        e.preventDefault();
        setOptionDialog(!optionDialog);
    }, [optionDialog]);

    const onChange = (editorState) => {
        seteditorState(editorState);
    }
    const handleKeyCommand = (command) => {
        _handleKeyCommand(command);
    }
    const onTab = (e) => {
        _onTab(e);
    }
    const toggleBlockType = (blockType) => {
        _toggleBlockType(blockType);
    }
    const toggleInlineStyle = (inlineStyle) => {
        _toggleInlineStyle(inlineStyle);
    }
    const _handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            onChange(newState);
            return true;
        }
        return false;
    }
    const _onTab = (e) => {
        const maxDepth = 4;
        onChange(
            RichUtils.onTab(
                e, 
                editorState, 
                maxDepth
            )
        );
    }
    const _toggleBlockType = (blockType) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        )
    }
    const _toggleInlineStyle = (inlineStyle) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        )
    }

    const validate = (values) => {
        const errors = required(['name', 'price'], values);
        // if(!errors.email){
        //     const emailError = email(values.email, values);
        //     if(emailError) {
        //         errors.email = email(values.email, values);
        //     }
        // }
        return errors;
    }

    const onSubmit = useCallback((value) => {
        
        dispatch({
            type: NEW_PRODUCT_POST_REQUEST,
            data: {
                ...value,
                option: [...option],
                category: category,
                brand: brand,
                content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            }
        });
    }, [category, brand, editorState, option]);


    const StyleButton = ({onToggle, style, active, label, ...others}) => {
        
        const onMouseDownToToggle = (e) => {
            e.preventDefault();
            onToggle(style);
        }
        return(
            <StyledSpanStyledButton 
                onMouseDown={onMouseDownToToggle} 
                active={active}
            >
                {label}
            </StyledSpanStyledButton>
        )
    }
    const BlockStyleControls = ({ editorState, onToggle, ...others }) => {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        return (
            <StyledDivRichEditorContols>
                {BLOCK_TYPES.map((type) => {
                    return(
                        <StyleButton
                            key={type.label}
                            active={type.style === blockType}
                            label={type.label}
                            onToggle={onToggle}
                            style={type.style}
                        />
                    )
                })}
            </StyledDivRichEditorContols>
        )    
    }
    const InlineStyleControls = ({ editorState, onToggle }) => {
        let currentStyle = editorState.getCurrentInlineStyle();
        return(
            <StyledDivRichEditorContols>
                {INLINE_STYLES.map(type => {
                    return(
                        <StyleButton
                            key={type.label}
                            active={currentStyle.has(type.style)}
                            label={type.label}
                            onToggle={onToggle}
                            style={type.style}
                        />
                    )
                })}
            </StyledDivRichEditorContols>
        )
    }

    const RenderOptionList = ({index, style}) => {
        console.log("Test");
        return (
            
            <ListItem button style={style} key={index}>
                <ListItemText>{option[index].color}</ListItemText>
                <ListItemText>{option[index].size}</ListItemText>
                <ListItemText>{option[index].quantity}</ListItemText>
            </ListItem>
            
          );
    }

    return(
        <Form
            onSubmit={onSubmit}
            subscription={{ submitting: true }}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    
                        <StyledFormControl>
                            <InputLabel id="category-select-label">CATEGORY</InputLabel>
                            <StyledStyledSelect
                                value={category}
                                onChange={onChangeCategory}
                                labelId='category-select-label'
                                inputProps={{
                                    name: 'categorySelect',
                                    id: 'category-select',
                                }}
                            >
                                {categories && categories.map((value, index) => {
                                    return(
                                    <StyledMenuItem
                                        key={value.id}
                                        value={value.id}>
                                            {value.categoryName}
                                    </StyledMenuItem>
                                    )
                                })}
                            </StyledStyledSelect>
                        </StyledFormControl>
                    

                    
                        <StyledFormControl>
                            <InputLabel id="brand-select-label">BRAND</InputLabel>    
                            <StyledStyledSelect
                                value={brand}
                                onChange={onChangeBrand}
                                labelId="brand-select-label"
                                inputProps={{
                                    name: 'brandSelect',
                                    id: 'brand-select'
                                }}
                            >
                                {brands && brands.map((value, index) => {
                                    return(
                                        <StyledMenuItem
                                            key={value.id}
                                            value={value.id}>
                                                {value.brandName}
                                        </StyledMenuItem>
                                    )
                                })}
                            </StyledStyledSelect>
                        </StyledFormControl>
                    

                    <Field
                        autoComplete="Name"
                        component={StyledTextField}
                        disabled={submitting}
                        fullWidth
                        label="Name"
                        margin="normal"
                        name="name"
                        required
                        size="medium"
                    />
                    
                    <Field
                        autoComplete="Price"
                        component={StyledTextField}
                        disabled={submitting}
                        fullWidth
                        label="Price"
                        margin="normal"
                        name="price"
                        required
                        size="medium"
                    />



                    <StyledButton onClick={onClickOption}>
                            Add Option
                    </StyledButton>
                    <AddOptionDialog open={optionDialog} close={onClickOption} option={option} setOption={setOption}/>
                    {/* {option.length !== 0 && option.map((value, index) => (
                        <div>
                            {value.size && <span>SIZE:{value.size}</span>}
                            {value.color && <span>COLOR:{value.color}</span>}
                            {value.quantity && <span>QUANTITY:{value.quantity}</span>}
                            {value.price && <span>PRICE:{value.price}</span>}
                        </div>
                    ))} */}
                    
                    <FixedSizeList height={400} width='100%' itemSize={46} itemCount={option.length}>
                        {RenderOptionList}
                    </FixedSizeList>
                    


                    <StyledDivRichEditorRoot>
                        <BlockStyleControls
                            editorState={editorState}
                            onToggle={toggleBlockType}
                        />
                        <InlineStyleControls
                            editorState={editorState}
                            onToggle={toggleInlineStyle}
                        />
                        <Editor
                            editorState={editorState}
                            onChange={onChange}
                            handleKeyCommand={handleKeyCommand}
                            onTab={onTab}
                        />
                        <StyledButtonSubmit type="submit">SUBMIT</StyledButtonSubmit>
                    </StyledDivRichEditorRoot>

                </form>
            )}
        />
    )
}



export default Product;