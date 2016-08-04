import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createEvent, setCurrentEvent } from '../actions/actions';

export class EventCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: "false", 
      group_visibility: "1",
      currentUser: this.props.currentUser.id,
      error_title: "",
      error_description: "",
      error_location: "",
      error_time: true,
      error_duration: true
    }  
  }

  onKeyPress(event) {
    this.setState({[event.target.name]:event.target.value})
  }

  onPrivacyChange(event) {
    this.setState({privacy:event.target.value})
  }

  onVisibilityChange(event) {
    this.setState({group_visibility: event.target.value})
  }

  validate(event) {
    console.log('event.title.length:',event.title.length)
    if (event.title.length === 0) {
      this.setState({error_title: 'Title cannot be empty'})
    } else if (event.title.length > 30 ) {
      this.setState({error_title:'Title has to be less than 30 characters'})
    }

    if (event.description.length === 0) {
      this.setState({error_description: 'Description cannot be empty'})
    } else if (event.description.length > 30 ) {
      this.setState({error_description:'Description has to be less than 30 characters'})
    }

    if (event.location.length === 0) {
      this.setState({error_location: 'Location cannot be empty'})
    }


    
  }

  isAllValid(){
    const items = this.state.isValidMessage;
    for (let key in items) {
      if (items[key].length > 0) return false;
    }
    return true;
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createEvent(this.state)
      .then(res => {
        if (res.error) throw new Error('Unable to create event');
        return this.props.setCurrentEvent(this.props.newEvent);
      })
      .then(() => { browserHistory.push(`/${this.props.newEvent.id}`) })
      .catch(err => {
        // clear form and display error?
        console.log(err);
      });
    }

  onClearValues(event) {
    this.setState({
      title: "", 
      description: "", 
      location: "", 
      time: "", 
      duration: "", 
      max_guests: "", 
      privacy: "false", 
      group_visibility: "1",
      error_title: "",
      error_description: "",
      error_location: "",
      error_time: true,
      error_duration: true
    })
  }

  render() {
    return(
      <div className="container">
          <br/>
          <h3 className="row">Create New Event</h3>
          <br/>
          <form role="form">
            <div className="form-group row">  
              <label className="col-xs-4">Title</label>     
              <input 
                className="col-xs-8"
                type="text" 
                name="title" 
                placeholder="Event title" 
                value={this.state.title} 
                onChange={this.onKeyPress.bind(this)}/>
                {this.state.error_title.length === 0 ? null : <div className="text-danger"> {this.state.error_title}</div>}
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Description</label>
              <input 
                className="col-xs-8"
                type="text" 
                name="description" 
                placeholder="Description" 
                value={this.state.description} 
                onChange={this.onKeyPress.bind(this)}/>
                {this.state.error_description.length === 0 ? null : <div className="text-danger"> {this.state.error_description}</div>}
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Location</label>
              <input 
                className="col-xs-8"
                type="text" 
                name="location" 
                placeholder="Location" 
                value={this.state.location} 
                onChange = {this.onKeyPress.bind(this)}/>
                {this.state.error_location.length === 0 ? null : <div className="text-danger"> {this.state.error_location}</div>}
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Time</label>
              <div className="col-xs-2">
                <select name="hour"  
                  className="form-control"               
                  value={this.state.hour} 
                  onChange={this.onKeyPress.bind(this)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="minute" 
                  className="form-control"   
                  value={this.state.hour} 
                  onChange={this.onKeyPress.bind(this)}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="ampm"
                  className="form-control"
                  value={this.state.ampm} 
                  onChange={this.onKeyPress.bind(this)}>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xs-4">Duration</label>
              <div className="col-xs-2">
                <select name="hour"  
                  className="form-control"               
                  value={this.state.hour} 
                  onChange={this.onKeyPress.bind(this)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="minute" 
                  className="form-control"   
                  value={this.state.hour} 
                  onChange={this.onKeyPress.bind(this)}>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
              </div>
              <div className="col-xs-2">
                <select name="ampm"
                  className="form-control"
                  value={this.state.ampm} 
                  onChange={this.onKeyPress.bind(this)}>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-4 ">Duration</label>
              <input 
                className="col-xs-8"
                name="duration" 
                type="number" 
                placeholder="Duration" 
                value={this.state.duration} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Guests</label>
              <input 
                className="col-xs-4"
                name="max_guests" 
                type="number" 
                placeholder="Number of guests" 
                value={this.state.max_guests} 
                onChange={this.onKeyPress.bind(this)}/>
            </div>
            <br/>
            <div className="form-group row">
              <label className="col-xs-4">Privacy</label>
              <div>
                <label className="col-xs-2">
                  <input 
                    className="form-check-input"
                    name="privacy" 
                    type="radio" 
                    value="false" 
                    checked={this.state.privacy === "false"} 
                    onChange={this.onPrivacyChange.bind(this)}/> 
                  <span>public</span>
                </label>
                <label className="col-xs-2">
                  <input 
                    className="form-check-input"
                    name="privacy" 
                    type="radio" 
                    value="true" 
                    checked={this.state.privacy === "true"} 
                    onChange={this.onPrivacyChange.bind(this)}/> 
                    <span>private</span>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-4">Visibility</label>
              <div>
                <label className="col-xs-2">
                  <input 
                    className="form-check-input"
                    name="group_visibility" 
                    type="radio" 
                    value="1" 
                    checked={this.state.group_visibility === "1"} 
                    onChange={this.onVisibilityChange.bind(this)}/> 
                    <span>group1</span>
                  </label>
              </div>
            </div>
            <div className="btn-toolbar">
              <button 
                type="submit" 
                className='btn btn-primary' 
                role="button"
                onClick={this.onSubmit.bind(this)}> 
                Submit 
              </button>
              <button 
                type="button" 
                className='btn btn-danger' 
                role="button"
                onClick={this.onClearValues.bind(this)}> 
                Clear Values 
              </button>
            </div>
          </form>
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    newEvent: state.eventCreate,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createEvent, setCurrentEvent}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
