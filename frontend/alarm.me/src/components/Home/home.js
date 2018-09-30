import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment';
import { Query, Mutation } from "react-apollo";

import { GET_ALARMS, DELETE_ALARM, CREATE_ALARM} from './gqlQueries.js'

class Home extends React.Component {
  state = {
    time: moment(new Date()).format('LTS')
  }

  componentDidMount() {
    let TIME_INTERVAL = 1000;
    setInterval(() => {
      this.setState({
        time: moment(new Date()).format('LTS')
      })
    },TIME_INTERVAL
    );
  }

  _updateStoreAfterDelete = (store, alarms, alarmId) => {
    const data = store.readQuery({ query: GET_ALARMS })
    let alarmIndex = data.alarms.findIndex(alarm => alarm.id === alarmId);
    let newAlarmData = data.alarms.splice(alarmIndex,1);
    data.alarmData = newAlarmData;
    store.writeQuery({ query: GET_ALARMS, data })
  }

  render () {
    return (
      <div>
        <h1>Home</h1>
        <h1>{this.state.time}</h1>
        <h1>Alarms</h1>

        <Query
          query={GET_ALARMS}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.alarms.map((alarm, i) => (
              <div key={i}>
                {i+1}. <h3>{alarm.title}</h3>
                <p>{alarm.note}</p>
                <p>{moment(alarm.dateTime).fromNow()}</p>
                <Mutation
                  mutation={DELETE_ALARM}
                  update={(store, { data: { alarms } }) =>
                    this._updateStoreAfterDelete(store, alarms, alarm.id)
                  }
                >
                  {(deleteAlarm, { data }) => (
                    <div>
                      <button type="submit" onClick={() => {
                        deleteAlarm({ variables: { id: alarm.id } });
                      }}>
                        Delete
                      </button>
                    </div>
                  )}
                </Mutation>
              </div>
            ));
          }}
        </Query>

        <Mutation
          mutation={CREATE_ALARM}
          update={(store, { data: { createAlarm } }) => {
            const { alarms } = store.readQuery({ query: GET_ALARMS });
            store.writeQuery({
              query: GET_ALARMS,
              data: { alarms: alarms.concat([createAlarm]) }
            });
          }}
        >
          {(createAlarm, { data }) => (
            <div>
              <button type="submit" onClick={() => {
                createAlarm({ variables: { userID: 1, dateTime: "2010-10-20 4:30", title: "Test", note: "note", color: "green" } });
              }}>
                Add
              </button>
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Home;
