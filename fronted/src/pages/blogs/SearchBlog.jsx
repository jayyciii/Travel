import React from 'react'
import { FaMicrophone } from "react-icons/fa6";

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }
    return (
        <div className='w-full flex'>
            <input type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder='Nhập từ khoá tìm kiếm..'
                className='py-2 px-4 mr-5 w-full bg-[#f7f8f9] focus:outline-none focus:border'></input>
            <button
            onClick={handleSearch}
             className='bg-[#1E73BE] px-4 py-2 text-white'>Search</button>
        </div>
    )
}

export default SearchBlog