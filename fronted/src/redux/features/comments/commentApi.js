import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/comments",
        credentials: "include",
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: (commentData) => ({
                url: "/post-comment",
                method: "POST",
                body: commentData,
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
        }),
        getToTalComments: builder.query({
            query: () => ({
                url: "/total-comments",
                method: "GET",
            }),
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/delete-comment/${id}`,  
                method: "DELETE",
                credentials: "include" 
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Comments', id }],
        }),

        getComments: builder.query({
            query: () => ({
                url: "/all-comments",  
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Comments', id: _id })),
                        { type: 'Comments', id: 'LIST' }
                    ]
                    : [{ type: 'Comments', id: 'LIST' }],
        }),   
    })
})

export const { useGetCommentsQuery, usePostCommentMutation, useDeleteCommentMutation, useGetToTalCommentsQuery } = commentApi;

export default commentApi;
