import React, { Component } from 'react';


export default class Auth extends Component {
  render() {
    return (

      <div className="container" className="pure-g">
        <div className="row">
          <div className="col-md-12" className="pure-u-1">
            <div className="col-xs-12" className="background_image">
            </div>
            <div className="landing-page-title">
              <h1 className="col-xs-12" className="page-header" className="auth-head">PULSE</h1>
              <a
                href='/api/passportFacebook/facebookLogin'
                className="pure-button pure-button-primary">
              <span className="fa fa-facebook-official" aria-hidden="true"></span>
                LOGIN!
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
