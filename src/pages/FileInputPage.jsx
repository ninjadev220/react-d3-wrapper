import React from 'react';

function FileInputPage() {
      
    const handleChangeFile = (file) => {
        const fileData = new FileReader();
        fileData.onloadend = r => {
            console.log(r.target.result);
        };;
        fileData.readAsText(file);
    }
      
    const fileInput = () => {
        return(
            <div className='file-uploader'>
                <input
                    className='file-uploader__input'
                    type="file" 
                    accept=".csv" 
                    onChange={e => handleChangeFile(e.target.files[0])} 
                /> 
            </div>
        )
    }

    return (
        <div className="App">
            <h2>File Input Example</h2>
            {fileInput()}
        </div>
  );
}

export default FileInputPage;