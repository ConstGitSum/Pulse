import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import Sidebar from './Sidebar';
import { 
  joinEvent,
  leaveEvent, 
  hideEvent, 
  unhideEvent 
} from '../actions/actions';

export class EventDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      sidebarToggle: false
    }
  }
  /**
   * Current user will join the current event
   * @return {undefined} 
   */
  onClickJoin() {
    this.props.joinEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then()
      .catch(err => console.log('ERROR - onClickJoin:', err))
  }

  /**
   * Current user will leave the current event if they have joined
   * @return {undefined}
   */
  onClickLeave() {
    this.props.leaveEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then()
      .catch(err => console.log('ERROR - onClickLeave:', err))
  }

  /**
   * Current event will be hidden from the current user
   * @return {undefined}
   */
  onClickHide() {
    this.props.hideEvent(this.props.currentEvent.id, this.props.currentUser.id)
    .then(() => browserHistory.push('/'))
    .catch(err => console.log('ERROR - onClickHide:', err))
  }

  /**
   * Current event will be unhidden for the current user
   * @return {undefined}
   */
  onClickUnhide() {
    this.props.unhideEvent(this.props.currentEvent.id, this.props.currentUser.id)
  }

  /**
   * Return the user to the previous page
   * @return {undefined} 
   */
  onClickBack() {
    browserHistory.push('/')
  }

  showHideSidebar() {
    if (this.state.sidebarToggle) {
      this.setState({ sidebarToggle: false });
    } else {
      this.setState({ sidebarToggle: true });
    };
  }

  render() {
    {/* Check to see if the event was created by the current user */}
    const creator = this.props.currentEvent.guests.find(guest => {
      return guest.id === this.props.currentEvent.created_by});

    return (
      <div className="event-details">
      <Sidebar />
          <span>Pulse</span>
        <div>
        {/* check if current user is already a guest
              True : Display Leave button
              False: Check if event has been hidden*/}
        {this.props.currentEvent.guests.some(guest => 
          guest.id === this.props.currentUser.id)
        ? <button
            onClick={this.onClickLeave.bind(this)}
            type='button'
            className="btn btn-danger">Leave</button>
        /* check if current event has been hidden
              True : Display Unhide button
              False: Display Join and Hide buttons */    
        : this.props.hiddenEvents.indexOf(this.props.currentEvent.id) !== -1
          ? <button
              onClick={this.onClickUnhide.bind(this)}
              type='button'
              className='btn btn-primary'>Unhide</button>
          : <div>
              <button
                onClick={this.onClickJoin.bind(this)}
                type='button' 
                className="btn btn-primary">Join</button>
              <button 
                onClick={this.onClickHide.bind(this)}
                type="button" 
                className="btn btn-default">Hide</button>
            </div>
        }      
        </div>

        <div>
          <span className="details">Details:</span>
          <span className="attendance">#/##</span>
        </div>

        <div>
          <p>Creator: {creator ? creator.name :  'no longer in event'}</p>
          <p>Title: {this.props.currentEvent.title}</p>
          <p>Description: {this.props.currentEvent.description}</p>
          <p>Location: {this.props.currentEvent.location}</p>
          <p>Time: {this.props.currentEvent.time}</p>
        </div>

        <div>
          <button className="btn btn-primary">Chat</button>
          <button 
            onClick={this.onClickBack.bind(this)}
            type="button"
            className="btn btn-danger">Back</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser,
    hiddenEvents: state.hiddenEvents
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent, 
    leaveEvent, 
    hideEvent,
    unhideEvent
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)