// @flow
import React from "react";

import "./BasePage.css";

type Props = {
  +children: any
};

const BasePage = (props: Props) =>
  <div className="site-wrapper">
    <div className="site-wrapper-inner">
      <div className="cover-container">

        <div className="masthead clearfix">
          <div className="inner">
            <h3 className="masthead-brand">Cover</h3>
            <nav className="nav nav-masthead">
              <a className="nav-link active" href="#">Home</a>
              <a className="nav-link" href="#">Features</a>
              <a className="nav-link" href="#">Contact</a>
            </nav>
          </div>
        </div>

        <div className="inner cover">
          {props.children}
        </div>

        <div className="mastfoot">
          <div className="inner">
            <p>
              Cover template for
              {" "}<a href="https://getbootstrap.com">Bootstrap</a>, by
              {" "}<a href="https://twitter.com/mdo">@mdo</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>;

export default BasePage;
