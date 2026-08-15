import { createSlice } from "@reduxjs/toolkit";

// Load initial state from local storage on refresh
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  // parse just converts raw text to a component i can then use this is to check the past 
  // users if there is no past users then empty (null)
const storedToken = localStorage.getItem("token") || storedUser?.accessToken || storedUser?.token || "";
// check for token in several places if not found in any then rreturn nothin ""...why this way just to make it flexible 
// wether a token or access token is returnd it works any way to find it by any name
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser,
    username: storedUser?.username || "",
    firstName: storedUser?.firstName || "",
    lastName: storedUser?.lastName || "",
    email: storedUser?.email || "",
    image: storedUser?.image || "",
    role: storedUser?.role || (storedUser?.username === "emilys" ? "admin" : "user"),
    // making emilys the admin
    token: storedToken,
    isActive: !!storedUser,
    isLoggedin: !!storedUser,
    skills: [],
    address: storedUser?.address || null,
  },
  // if there is stored dta then bring  it if not then return "" just empty
  reducers: {
    login: (state, action) => {
      console.log("Login Payload:", action.payload);

      const payload = action.payload || {};
      // preventing an error if any of the data came missing by giving it an 
      // option of returning it emoty instead of giving error
      const authToken = payload.accessToken || payload.token || "";
      // to get any of the 2 ,if it is called accesstoken its ok 
      // and if its called token its also ok 

      state.user = payload;
      state.username = payload.username || "";
      state.firstName = payload.firstName || "";
      state.lastName = payload.lastName || "";
      state.email = payload.email || "";
      state.image = payload.image || "";
      state.role = payload.role || (payload.username === "emilys" ? "admin" : "user");
      state.token = authToken;
      state.isActive = true;
      state.isLoggedin = true;
      state.address = payload.address || null;
      // updating values
    },
    logout: (state) => {
      state.user = null;
      state.username = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
      state.role = "";
      state.token = "";
      state.isActive = false;
      state.isLoggedin = false;
      state.skills = [];
      state.address = null;
      // reseting every thing 
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;