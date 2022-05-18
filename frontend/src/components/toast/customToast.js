import React from "react";
import { Toast } from "react-bootstrap";

export class CustomToast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showToast: this.props.showToast,
      action: this.props.action,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showToast !== this.props.showToast)
      this.setState({
        showToast: this.props.showToast,
        action: this.props.action,
      });
  }

  closeToast = () => {
    this.setState({ showToast: false });
    this.props.closeToast();
  };

  render() {
    return (
      <div className="custom-toast">
        <Toast
          onClose={this.closeToast}
          show={this.state.showToast}
          delay={3000}
          autohide
          className={
            this.state.action.type === "SUCCESS"
              ? "success-toast"
              : "error-toast"
          }
        >
          <Toast.Body>
            <div className="custom-toast__container">
              <div className="custom-toast__content">
                <div>{this.state.action.title}</div>
                <div>{this.state.action.message}</div>
              </div>
              <div
                className="custom-toast__close-icon"
                onClick={this.closeToast}
              >
                X
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}
