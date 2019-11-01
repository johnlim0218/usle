import React, { useState, useCallback, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { TextField } from '@material-ui/core';


const MyEditor = () => {
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
      );
      
    const onChange = (editorState) => {
        setEditorState(editorState);
    }
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState) {
            onChange(newState);
            return 'handled';
        } 
        return 'not-handled';
    }

    const _onBoldClick = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }
    
    const [editorStateB, setEditorStateB] = useState(
        EditorState.createEmpty()
    );

    const logState = () => {

        // JSON 형태로 변환
        // DB에 저장할 때
        const tempParse = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        console.log(tempParse);
       
        // JSON 형태에서 state형태로 변환
        // DB에서 불러올 때
        const contentState = convertFromRaw(JSON.parse(tempParse));
        setEditorStateB(EditorState.createWithContent(contentState));
        // console.log(contentState);
        // setEditorStateB(contentState);
        console.log(EditorState.createWithContent(contentState));
    };

    useEffect(() => {
        console.log(editorStateB.getCurrentContent());
        console.log(editorStateB);
    }, [editorStateB])

    return(
        <>
        <div style={{padding:'20px', width:'600px'}}>
              <div style={{border:'1px solid #ccc', cursor:'text', minHeight:'80px', padding:'10px'}}>
                    <button onClick={_onBoldClick}>Bold</button>
                    <Editor
                        editorState={editorState}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                        placeholder="Enter some text..."
                    />
              </div>
              <input
                style={{marginTop:'80px', textAlign:'center'}}
                type="button"
                value="Log State"
                onClick={logState}
              />
        </div>
        <div style={{padding:'20px', width:'600px'}}>
        <div style={{border:'1px solid #ccc', cursor:'text', minHeight:'80px', padding:'10px'}}>
              <Editor
                  editorState={editorStateB}
                  onChange={editorStateB}
              />
        </div>
     
  </div>
  </>
    )
}

export default MyEditor;
