import React, { useState } from 'react';
import axios from 'axios';

const ImportCSV = () => {
  const [file, setFile] = useState(null); 
  const [showInput, setShowInput] = useState(false); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); 
  };

  const handleImport = async () => {
    if (!file) {
      alert('Vui lòng chọn file CSV để import.'); 
      return;
    }

    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await axios.post('http://localhost:3000/api/blogs/importBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data); 
     
      setFile(null);
      setShowInput(false);
    } catch (error) {
      console.error('Error importing CSV:', error);
      alert('Đã xảy ra lỗi khi import.');
    }
  };

  return (
    <div className="w-full max-w-full text-right">
      <button
        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowInput(!showInput)} 
      >
        {showInput ? 'Hủy chọn file' : 'Import CSV'}
      </button>

      {showInput && ( 
        <div className="mt-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-2" 
          />
          <button
            className="bg-green-500 text-white active:bg-green-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleImport}
          >
            Lưu
          </button>
        </div>
      )}
    </div>
  );
};

export default ImportCSV;
