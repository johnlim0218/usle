import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { FixedSizeList } from 'react-window';

import { required } from '../../form/validation';
import RFTextField from '../../form/RFTextField';
import FormFeedback from '../../form/FormFeedback';
import FormButton from '../../form/FormButton';
import AddOptionDialog from '../../components/Admin/AddOptionDialog';
import { StyledMenuItem, StyledSelect } from '../product';
import { NEW_PRODUCT_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE_REQUEST } from '../../reducers/admin/adminProductReducer';
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
    background-color: #ddd;
`

const StyledDivSection = styled.div`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const StyledDivImagePreview = styled.div`
    display: inline-block;
`
const StyledImgPreview = styled.img`
    padding: 15px;
    width: 150px;

`

const StyledDivRichEditorRoot = styled.div`
    background: #fff;
    border: 1px solid #ddd;
    font-size: 14px;
    padding: 15px;
    min-height: 500px;
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

const StyledButtonSubmit = styled(Button)`
    margin-top: 10px;
    background-color: #ddd;
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
    const { imagePaths } = useSelector((state) => state.adminProductReducer);
    const imageInput = useRef();
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

    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    }, []);

    const onClickImageUpload = useCallback((e) => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onClickRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE_REQUEST,
            data: {
                index: index,
                file: imagePaths[index],
            }
        })
    })

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

    const onSubmit = useCallback((value) => {
        
        const formData = new FormData();
        
        imagePaths.forEach((index) => {
            formData.append('image', index);
        });
        formData.append('category', category);
        formData.append('brand', brand);
        formData.append('name', value.name);
        formData.append('price', value.price);
        formData.append('option', JSON.stringify(option));
        formData.append('description', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
       
        dispatch({
            type: NEW_PRODUCT_POST_REQUEST,
            data: formData,
        });

    }, [category, brand, editorState, option, imagePaths]);


    const RenderOptionList = ({index, style}) => {
        return (
            <ListItem button style={style} key={index}>
                <ListItemText>COLOR : {option[index].color}</ListItemText>
                <ListItemText>SIZE : {option[index].size}</ListItemText>
                <ListItemText>QUANTITY : {option[index].quantity}</ListItemText>
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
                    encType="multipart/form-data"
                >
                        {/* 카테고리 */}
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

                        {/* 브랜드 */}
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
                    
                    {/* 상품 이름 */}
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
                    
                    {/* 가격 */}
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

                    {/* 이미지 업로드 */}
                    <StyledDivSection>
                        <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                        <StyledButton onClick={onClickImageUpload}>
                            Image Upload
                        </StyledButton>
                                
                        {/* 이미지 미리보기 */}
                        {imagePaths.length !== 0 && imagePaths.map((value, index) => {
                            return(
                                <StyledDivImagePreview key={value}>
                                    <StyledImgPreview src={`http://localhost:3065/images/${value}`} alt={value}/>
                                    <div>
                                        <Button
                                            onClick={onClickRemoveImage(index)}
                                            size='small'
                                            justIcon
                                            round
                                        >
                                            <RemoveCircleOutlineIcon/>
                                        </Button>
                                    </div>
                                </StyledDivImagePreview>
                            )
                        })}        
                    </StyledDivSection>

                    {/* 상품 옵션 추가 */}
                    <StyledDivSection>            
                        <StyledButton onClick={onClickOption}>
                                Add Option
                        </StyledButton>
                        <AddOptionDialog open={optionDialog} close={onClickOption} option={option} setOption={setOption}/>
                        
                        <FixedSizeList height={100} width='100%' itemSize={46} itemCount={option.length}>
                            {RenderOptionList}
                        </FixedSizeList>
                    </StyledDivSection>

                    {/* 상품 상세 정보 작성 폼 */}
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
                    </StyledDivRichEditorRoot>
                    <StyledButtonSubmit type="submit">SUBMIT</StyledButtonSubmit>
                </form>
            )}
        />
    )
}



export default Product;