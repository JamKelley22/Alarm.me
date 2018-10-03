

export const GET_ALARMS = `
  {
    alarms(userID: 1) {
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
