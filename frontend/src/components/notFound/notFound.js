import React from "react";
import "./not-found.scss";

const NotFound = () => {
  return (
    <>
      <div className="not-found-section">
        <div className="container">
          <div className="row not-found-section__content">
            <div className="col">
              <div className="w-25 m-auto">
                <div className="form-group text-center">
                  <div className="not-found-section__icon"></div>

                  <div className="not-found-section__text">
                    404 - Page Not Found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
