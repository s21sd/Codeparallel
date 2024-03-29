import React, { useState, useCallback } from 'react'
import Select from 'react-select';
import CodeMirror from '@uiw/react-codemirror';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
const options = [
    { value: 'javascript', label: 'javascript' },
    { value: 'c++', label: 'c++' },
    { value: 'java', label: 'java' },
];
const Editor = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [value, setValue] = useState("console.log('hello world!');");
    const onChange = useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);

    return (
        <div>
            <div>
                <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
            </div>
            <div>
                <CodeMirror value={value} height="100vh"
                    theme={draculaInit({
                        settings: {
                            caret: '#c6c6c6',
                            fontFamily: 'monospace',
                        },
                        styles: [
                            { tag: t.comment, color: '#6272a4' },
                        ]
                    })}
                    extensions={[javascript({ jsx: true })]} onChange={onChange} />
            </div>
        </div>
    )
}

export default Editor
