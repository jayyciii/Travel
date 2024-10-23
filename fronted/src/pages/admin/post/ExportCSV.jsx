import React from 'react';
import axios from 'axios';

const ExportCSV = () => {
    const handleExport = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/blogs/exportBlog/export', {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'blogs.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting CSV:', error);
            alert('Đã xảy ra lỗi khi xuất dữ liệu.');
        }
    };

    return (
        <div className="w-full max-w-full text-right">
            <button
                className="bg-indigo-500 w-28 text-white active:bg-indigo-600 text-xs font-bold uppercase px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleExport}
            >
                Export CSV
            </button>
        </div>
    );
};

export default ExportCSV;
