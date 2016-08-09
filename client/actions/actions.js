import axios from 'axios';

import { parseTime, parseDuration } from '../utils/form';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_EVENTS = 'GET_EVENTS';
export const FILTER_EVENTS = 'FILTER_EVENTS';
export const SET_CURRENT_EVENT = 'SET_CURRENT_EVENT';
export const USER_LOGOUT = 'USER_LOGOUT';
export const JOIN_EVENT = 'JOIN_EVENT';
export const HIDE_EVENT = 'HIDE_EVENT';
export const UNHIDE_EVENT = 'UNHIDE_EVENT';
export const LEAVE_EVENT = 'LEAVE_EVENT';
export const GET_HIDDEN_EVENTS = 'GET_HIDDEN_EVENTS';
export const CREATE_EVENT = 'CREATE_EVENT';
export const VALIDATE_EVENT_FORM = 'VALIDATE_EVENT_FORM';
export const UPDATE_EVENT_FIELD = 'UPDATE_EVENT_FIELD';
export const CLEAR_FORM_VALUES = 'CLEAR_FORM_VALUES';
export const UPDATE_TIME = 'UPDATE_TIME';

export function getCurrentUser() {
  const request = axios.get('/api/auth/loggedIn')

  return {
    type: GET_CURRENT_USER,
    payload: request
  }
}

export function userLogOut() {
  const request = axios.post('/api/auth/logOut');

  return {
    type: USER_LOGOUT,
    payload: request
  }
}

export function getList() {
  const request = axios.get('/api/events')
    .then(events => 
      Promise.all(events.data.map(event => 
        axios.get(`/api/events/${event.id}/guests`)
          .then(guests => Object.assign(event, { guests: guests.data }))
      ))
    );

  return {
    type: GET_EVENTS,
    payload: request
  }
}

export function filterList(eventList, filter, userId, hiddenEvents) {
  const payload = 
    filter === 'unhidden' ?
      eventList.filter(e => !hiddenEvents.includes(e.id)) :
    filter === 'hidden' ?
      eventList.filter(e => hiddenEvents.includes(e.id)) :
    filter === 'created' ?
      eventList.filter(e => e.created_by === userId) :
    filter === 'joined' ?
      eventList.filter(e => e.guests.some(guest => 
        guest.id === userId && guest.status === 'accepted')) :
    filter === 'pending' ?
      eventList.filter(e => e.guests.some(guest => 
        guest.id === userId && guest.status === 'pending')) :
    eventList;

  return {
    type: FILTER_EVENTS,
    payload: payload
  }
}

export function setCurrentEvent(event) {
  return {
    type: SET_CURRENT_EVENT,
    payload: event
  }
}

export function joinEvent(eventId, userId) {
  const url = `/api/events/${eventId}/guests`;
  const body = {
    user_id: userId,
    status: "accepted"
  };
  const request = axios.post(url, body);

  return {
    type: JOIN_EVENT,
    payload: request
  }
}

export function hideEvent(eventId, userId) {
  const url = `/api/events/${eventId}/hide`;
  const body = { user_id: userId };
  const request = axios.post(url, body);

  return {
    type: HIDE_EVENT,
    payload: request
  }
}

export function unhideEvent(eventId, userId) {
  const url = `/api/events/${eventId}/hide/${userId}`
  const request = axios.delete(url)

  return {
    type: UNHIDE_EVENT,
    payload: request
  }
}

export function leaveEvent(eventId, userId) {
  const url = `/api/events/${eventId}/guests/${userId}`;
  const request = axios.delete(url);

  return {
    type: LEAVE_EVENT,
    payload: request
  }
}


export function getHiddenEvents(user_id) {
  const request = axios.get(`/api/events/hide/${user_id}`)

  return {
    type: GET_HIDDEN_EVENTS,
    payload: request
  }
}

export function updateTime() {
  return {
    type: UPDATE_TIME,
  }
}

export function createEvent(formData, currentUser) {
  const request = axios.post('/api/events', {
    title: formData.title,
    description: formData.description,
    created_by: currentUser.id,
    location: formData.location,
    time: parseTime(formData.hour, formData.minute, formData.ampm),
    duration: parseDuration(formData.duration_hour,formData.duration_minute),
    max_guests: formData.max_guests || 999999999,
    privacy: formData.privacy || false,
    group_visibility: formData.group_visibility || null
  })

  return {
    type: CREATE_EVENT,
    payload: request
  }
}

export function validateEventForm(formData) {

  return {
    type: VALIDATE_EVENT_FORM,
    payload: { formData }
  }
}

export function updateEventField(fieldKey, fieldValue) {
  
  return {
    type: UPDATE_EVENT_FIELD,
    payload: { fieldKey, fieldValue }
  }
}

export function clearFormValues() {
  
  return {
    type: CLEAR_FORM_VALUES
  }
}
