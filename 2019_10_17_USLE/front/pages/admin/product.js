import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

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

const Product = () => {
    const [editorState, seteditorState] = useState(
        EditorState.createEmpty()
    );
    
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
        _toggleInlineStyled(inlineStyle);
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

    const BlockStyleControls = ({editorState, onToggle, ...others}) => {
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

    return(
        <StyledDivRichEditorRoot>
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <Editor
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                onTab={onTab}
                placeholder="Tell a story"
            />
        </StyledDivRichEditorRoot>
    )

}

export default Product;