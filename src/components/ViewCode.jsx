import React, { useState, useEffect } from 'react';

// Utilidades //
import CodeMirror from 'react-codemirror';



const ViewCode = (props) => {
     //console.log(props)

     const [data, setData] = useState({})
     useEffect(() => {
          setData(props.data)
          //console.log(data)
     })

     const optionsCodeMirror = {
          lineNumbers: true,
          readOnly: true,
          mode: 'javascript',
          theme: 'material-ocean',
     };

     return (
          <>
               {
                    data.scriptCode !== undefined && <CodeMirror value={data.scriptCode} options={optionsCodeMirror} />
               }
          </>

     );
}

export default ViewCode;