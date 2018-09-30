import { gql } from 'apollo-boost'

export const GET_ALARMS = gql`
  {
    alarms {
      id
      userID
      dateTime
      title
      note
      color
    }
  }
`;

export const DELETE_ALARM = gql`
  mutation deleteOneAlarm($id: Int!) {
    deleteAlarm(id: $id) {
      id
    }
  }
`;

export const CREATE_ALARM = gql`
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
