import axios from 'axios';
import moment from 'moment';

import {
  CREATE_EVENT,
  VALIDATE_EVENT_FORM,
  UPDATE_EVENT_FIELD,
  CLEAR_FORM_VALUES,
  UPDATE_TIME,
  EDIT_EVENT,
  UPDATE_EVENT } from '../actions/actions';
import {
  getDefaultState,
  isTimeWithinRange,
  isTimeInTheFuture,
  getEventTime,
  get24Hour,
  validateTitle,
  validateDescription,
  validateLocation,
  validateHour,
  validateMinute,
  validateAmpm,
  validateCapacity,
  validateField,
  validateTimeRange,
  validateForm  } from '../utils/form';

export default function(state = getDefaultState(), action) {
  let validationErrors;
  switch (action.type) {
    case VALIDATE_EVENT_FORM:
      validationErrors = validateForm(Object.assign({}, state.validationErrors), state.eventFormData);
      return Object.assign({}, state, {
        eventFormData: Object.assign({}, state.eventFormData),
        validationErrors: validationErrors
      });

    case UPDATE_EVENT_FIELD:
      validationErrors = Object.assign({}, state.validationErrors);
      const fieldError = validateField(action.payload.fieldKey, action.payload.fieldValue);
      if (fieldError.length !== 0) {
        validationErrors[action.payload.fieldKey] = fieldError;
      } else {
        delete validationErrors[action.payload.fieldKey];
      }
      return Object.assign({}, state, {
        eventFormData: Object.assign({}, state.eventFormData, { [action.payload.fieldKey]: action.payload.fieldValue }),
        validationErrors
      });
    case CLEAR_FORM_VALUES: {
      return Object.assign({}, getDefaultState());
    }
    case UPDATE_TIME: {
      return Object.assign({}, getDefaultState());
    }
    case EDIT_EVENT: {
      const time = {
        hour: moment(action.payload.time).format('h'),
        minute: moment(action.payload.time).format('mm'),
        ampm: moment(action.payload.time).format('a')
      }
      let newState = Object.assign({}, state);
      newState.eventFormData = action.payload;
      newState.eventFormData.hour = time.hour;
      newState.eventFormData.minute = time.minute;
      newState.eventFormData.ampm = time.ampm;
      const endTime = newState.eventFormData.endTime;
      const currentTime = moment();
      if(moment(endTime).isSame(currentTime, 'day')) {
        newState.eventFormData.is_tomorrow = false;
      } else {
        newState.eventFormData.is_tomorrow = true;
      }
      const seconds = action.payload.duration;
      const dhours = Math.floor(seconds/(60 * 60));
      const dmins = Math.floor((seconds - dhours * 60 * 60)/ 60);
      newState.eventFormData.duration_hour = dhours;
      newState.eventFormData.duration_minute = dmins;
      newState.eventFormData.privacy = action.payload.privacy.toString();
      newState.toggleEventUpdate = true;
      newState.validationErrors = {}
      return newState;
    }
    default:
      return state;
  }
}
