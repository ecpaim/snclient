import { createSlice } from '@reduxjs/toolkit'

/*
  createSlice automatically generates the action type strings 
  and action creator functions based on the names of the reducers we listed
*/
const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
      username: 'username',
      email: 'example@email.com',
      profilePic:'',
      authenticated: false,
      likes: {},
      currentPost: {}
  },
  reducers: {
    changeEmail: {
      reducer(state, action) {
        const { newEmail } = action.payload
        state.email = newEmail
      },
      prepare(newEmail) { // reducer/prepare are useless in this example
        return { payload: { newEmail } }
      }
    },
    setAuthentication(state,action){
      const  {user, authBool}  = action.payload;
      state.authenticated = authBool; //thanks to immer library we can mutate the immutable redux state
      state.username = user; 
    },
    setUserInfo(state,action) {
      const {username, email, profilePic} = action.payload;
      state.username = username;
      state.email = email;
      state.profilePic = profilePic;
    },
    setLikes(state,action){
      const { likes } = action.payload;
      let newLikes = {};
      likes.forEach( like => newLikes[like.id] = like.hidden ? 'hidden' : 'visible');
      state.likes = newLikes;
    },
    addLike(state,action){
      const { like } = action.payload;
      state.likes[like.id] = like.type;
    },
    removeLike(state,action){
      const { id } = action.payload;
      state.likes[id] = undefined;
    },
    addCurrentPost(state,action){
      const {pst, comments, likes} = action.payload;
      state.currentPost = {...pst, comments: comments, likes: likes};
    },
    addComment(state,action){
      const comment = action.payload;
      state.currentPost.comments.push(comment);
    }
  }
})
export const { changeEmail, setAuthentication, setUserInfo, setLikes, addLike, removeLike, addCurrentPost, addComment } = userSlice.actions;
export default userSlice.reducer;