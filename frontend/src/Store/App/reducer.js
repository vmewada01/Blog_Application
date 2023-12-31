import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  error: "",
  blogs: [],
  blog: {},
  userBlogs: [],
  likes: [],
  comments: [],

};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.CREATE_BLOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.CREATE_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case types.CREATE_BLOG_FAILURE: {
      return {
        ...state,
        error: payload,
        isLoading:false,
      };
    }

    case types.GET_BLOGS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.GET_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blogs: payload,
      };
    }

    case types.GET_BLOGS_FAILURE: {
      return {
        ...state,
        error: payload,
        isLoading:false,
      };
    }

    case types.GET_BLOG_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.GET_BLOG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        blog: payload,
      };
    }

    case types.GET_BLOG_FAILURE: {
      return {
        ...state,
        error: payload,
        isLoading:false,
      };
    }

    case types.GET_USER_BLOGS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case types.GET_USER_BLOGS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userBlogs: payload,
      };
    }

    case types.GET_USER_BLOGS_FAILURE: {
      return {
        ...state,
        error: payload,
        isLoading:false,
      };
    }

    case types.UPDATE_BLOG_REQUEST: {
        return {
          ...state,
          isLoading: true,
        };
      }
  
      case types.UPDATE_BLOG_SUCCESS: {
        return {
          ...state,
          isLoading: false,
        };
      }
  
      case types.UPDATE_BLOG_FAILURE: {
        return {
          ...state,
          error: payload,
          isLoading:false,
        };
      }

      case types.LIKE_BLOG_REQUEST:{
        return {
            ...state,
            isLoading: true,
        }
      }

      case types.LIKE_BLOG_SUCCESS:{
        return {
            ...state,
            isLoading: false,
            likes: payload
        }
    }

    case types.LIKE_BLOG_FAILURE:{
        return {
            ...state,
            error: payload,
            isLoading:false,
        }
    }
    

    case types.COMMENT_BLOG_REQUEST:{
      return {
          ...state,
          isLoading: true,
      }
    }

    case types.COMMENT_BLOG_SUCCESS:{
      return {
          ...state,
          isLoading: false,
          comments: payload
      }
  }

  case types.COMMENT_BLOG_FAILURE:{
      return {
          ...state,
          error: payload,
          isLoading:false,
      }
  }

     default: {
      return state;
    }
  }
};
