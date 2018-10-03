import { TestUserID, JohnnyUserID } from './defaultUserIDs.js'

let USER_ID = TestUserID;

const getUsername = () => {
  switch (USER_ID) {
    case TestUserID:
      return 'Test User';
    case JohnnyUserID:
      return 'Johnny';
    default:

  }
}

const setUserID = (newID) => {
  USER_ID = newID
}


export { USER_ID, getUsername, setUserID }
