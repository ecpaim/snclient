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
      authenticated: false
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
    }

  }
})
export const { changeEmail, setAuthentication } = userSlice.actions;
export default userSlice.reducer;