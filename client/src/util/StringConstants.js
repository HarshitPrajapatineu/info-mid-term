

export const BASE_URL = "http://localhost:5500/api";

// --------VIEWS---------
export const FETCH_LOGIN_VIEW = "/view/login";
export const FETCH_REGISTRATION_VIEW = "/view/registration";
export const FETCH_POST_EDITOR_VIEW = "/view/posteditor";
export const FETCH_FEED_VIEW = "/view/feed";
export const FETCH_PROFILE_VIEW = "/view/profile";
export const FETCH_DASHBOARD_VIEW = "/view/dashboard";
export const FETCH_USER_ROSTER_VIEW = "/view/userroster";
export const FETCH_SEARCH_VIEW = "/view/search";
export const FETCH_USER_EDITOR_VIEW = "/view/usereditor"

// --------AUTH---------
export const AUTH_LOGIN = "/auth/login";
export const AUTH_LOGOUT = "/auth/logout";

// --------USERS---------
export const FETCH_ALL_USERS = "/user/getAllUsers";
export const REGISTER_USER = "/user/register";
export const FETCH_USER_DATA = "/user/get";
export const UPDATE_USER = "/user/update";
export const FETCH_USER_ROSTER_DATA = "/user/getUsers";
export const DELETE_USER = "/user/delete";
export const FOLLOW_USER = "/user/follow";
export const UNFOLLOW_USER = "/user/unfollow";

// --------POSTS---------
export const SAVE_POST = "/post/save";
export const FETCH_FEED_DATA = "/post/getFeedData";
export const FETCH_USER_POSTS = "/post/getUserPosts";
export const FETCH_POST_DATA_BY_USERID = "/post/getPostByUserId";
export const UPDATE_LIKE = "/post/updateLike";
export const GET_POST = "/post/get";
export const DELETE_POST = "/post/delete";
export const UPDATE_POST = "/post/update";