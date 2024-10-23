import React from 'react';
import { useDeleteCommentMutation, useGetCommentsQuery } from '../../../redux/features/comments/commentApi';
import { formatDate } from '../../../utilis/formateDate';
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

const ManageComments = () => {
  const { data: commentsData = {}, error, isLoading, refetch } = useGetCommentsQuery();
  const comments = commentsData || []; 

  const [deleteComment] = useDeleteCommentMutation();

  const handleDelete = async (id) => {
    try {
      const response = await deleteComment(id).unwrap();
      alert(response.message); 
      refetch(); 
    } catch (error) {
      console.error("Failed to delete comment", error);
      alert("Error deleting comment: " + error.message); 
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>} 
      {error && <div>Error fetching comments.</div>} 

      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">All Comments</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    EXPORT CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
          
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      COMMENT
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      USER
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      PUBLISHING DATE
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ACTION
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                    comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <tr key={comment._id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {comment.comment} 
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {comment.user ? comment.user.username : "Anonymous"} 
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {formatDate(comment.createdAt)} 
                          </td>
  
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button
                              onClick={() => handleDelete(comment._id)}
                              className='bg-red-600 text-white px-2'>Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">No comments found</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageComments;
