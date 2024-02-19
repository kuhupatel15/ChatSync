export const getOppUserName = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id
    ? users[1].userName
    : users[0].userName;
};

export const getOppUser = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id 
  ? users[1] 
  : users[0];
};

export const getAdmin = (admin,userid)=>{
  return admin===userid
}