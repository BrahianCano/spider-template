import React, { useState, useEffect } from 'react';

// Utilidades //
import CodeMirror from 'react-codemirror';


export default function ViewCode(props) {
     const [data, setData] = useState({});

     useEffect(() => setData(props.data));

     const optionsCodeMirror = {
          lineNumbers: true,
          readOnly: props.readOnly,
          mode: 'javascript',
          theme: 'material-ocean',
     };

     return (
          <>
               {
                    data.scriptCode !== undefined && <CodeMirror value={data.scriptCode} options={optionsCodeMirror}
                         onChange={(value) => { props.onChange ? props.onChange(value) : console.log(value) }} />
               }
          </>

     );
};
