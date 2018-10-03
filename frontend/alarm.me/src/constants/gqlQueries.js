import { USER_ID } from './user.js'

export const GET_ALARMS = `
  {
    alarms(userID: ${USER_ID}) {
      id
      userID
      dateTime
      title
      note
      color
    }
  }
`;

export const DELETE_ALARM = `
  mutation deleteOneAlarm($id: Int!, $userID: Int!) {
    deleteAlarm(id: $id, userID: $userID) {
      id
    }
  }
`;

export const CREATE_ALARM = `
  mutation createAlarm($userID: Int!, $dateTime: String!, $title: String!, $note: String!, $color: String! ) {
    createAlarm(userID: $userID, dateTime: $dateTime, title: $title, note: $note, color: $color) {
      id
      userID
      dateTime
      title
      note
      color
    }
  }
`;

export const UPDATE_ALARM = `
mutation updateAlarm($userID: Int!, $id: Int!, $dateTime: String, $title: String, $note: String, $color: String) {
    updateAlarm(userID: $userID, id: $id, dateTime: $dateTime, title: $title, note: $note, color: $color) {
      id
      userID
      dateTime
      title
      note
      color
    }
  }
`;
