import React, { Component } from "react";
import { Table, Header, Modal } from "semantic-ui-react";
import Data from "../SampleResponse.json";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";

class Dashboard extends Component {
  state = {
    isModalVisible: false,
    selectedDate: moment(),
    currentUserIndex: 0,
  };

  dateOnChangeHandler = (momentDate, date) => {
    this.setState({
      selectedDate: moment(momentDate),
    });
  };

  render() {
    const { isModalVisible, currentUserIndex, selectedDate } = this.state;
    let currentTimeList = Data.members[currentUserIndex].activity_periods || [];
    let timeListToDisplay = [];
    currentTimeList.forEach((data) => {
      if (
        moment(selectedDate).format("DD-MM-YYYY") ===
        moment(data.start_time, "MMM DD YYYY h:mmA").format("DD-MM-YYYY")
      ) {
        timeListToDisplay.push(data);
      }
    });
    return (
      <div className="parent-wrapper">
        <div className="side-bar">
          <div className="side-bar-item">Dashboard</div>
        </div>
        <div className="content-wrapper">
          <Header as="h2">Users List</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Time Zone</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Data.members &&
                Data.members.map((member, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <button
                          onClick={() => {
                            this.setState({
                              isModalVisible: true,
                              currentUserIndex: i,
                            });
                          }}
                          className="dashboard-user-name-button"
                        >
                          {member.real_name}
                        </button>
                      </Table.Cell>
                      <Table.Cell>{member.tz}</Table.Cell>
                      <Table.Cell positive>ACTIVE</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>

        <Modal
          closeIcon
          onClose={() =>
            this.setState({
              isModalVisible: false,
              selectedDate: moment(),
            })
          }
          open={isModalVisible}
        >
          <Modal.Header>
            <div className="modal-header-wrapper">
              <div>User Details</div>
              <div>
                <DayPickerInput
                  value={moment(this.state.selectedDate).format("DD-MM-YYYY")}
                  format="DD-MM-YYYY"
                  placeholder="DD-MM-YYYY"
                  onDayChange={this.dateOnChangeHandler}
                />
              </div>
            </div>
          </Modal.Header>
          <Modal.Content>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Start Time</Table.HeaderCell>
                  <Table.HeaderCell>End Time</Table.HeaderCell>
                  <Table.HeaderCell>Time Zone</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {timeListToDisplay && timeListToDisplay.length > 0 ? (
                  timeListToDisplay.map((timeData, i) => {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell>{timeData.start_time}</Table.Cell>
                        <Table.Cell>{timeData.end_time}</Table.Cell>
                        <Table.Cell>
                          {Data.members[currentUserIndex].tz}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })
                ) : (
                  <Table.Row>
                    <Table.Cell>No data</Table.Cell>
                    <Table.Cell>No data</Table.Cell>
                    <Table.Cell>No data</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
