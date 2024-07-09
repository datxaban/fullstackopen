import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], viewedBlog: null },
  reducers: {
    setBlogs(state, action) {
      return { blogs: action.payload, viewedBlog: state.viewedBlog };
    },
    setViewedBlog(state, action) {
      return {
        blogs: state.blogs,
        viewedBlog: state.blogs.find((blog) => blog.id === action.payload),
      };
    },
    addBlog(state, action) {
      return {
        blogs: [...state.blogs, action.payload],
        viewedBlog: state.viewedBlog,
      };
    },
    updateBlog(state, action) {
      return {
        blogs: state.blogs,
        viewedBlog: { ...state.viewedBlog, likes: action.payload.likes },
      };
    },
    commentBlogAction(state, action) {
      const newComment = { content: action.payload.content , id: action.payload.id };
      return {
        blogs: state.blogs.map((blog) =>
          blog.id === state.viewedBlog.id ? { ...blog, comments: blog.comments.concat(newComment) } : blog
        ),
        viewedBlog: {
          ...state.viewedBlog,
          comments: [...state.viewedBlog.comments, newComment],
        },
      };
    },
    deleteBlog(state, action) {
      return {
        blogs: state.blogs.filter((blog) => blog.id !== action.payload.id),
        viewedBlog: state.viewedBlog,
      };
    },
  },
});

export const {
  setBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  setViewedBlog,
  commentBlogAction,
} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const response = await blogService.create(blogObject);
    dispatch(addBlog(response));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const response = await blogService.update(blog.id, newBlog);
    dispatch(updateBlog(response));
  };
};

export const deleteBlogAction = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch(deleteBlog(blog));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const response = await blogService.comment(id, comment);
    console.log("T",response);
    dispatch(commentBlogAction(response));
  };
};

export default blogSlice.reducer;
