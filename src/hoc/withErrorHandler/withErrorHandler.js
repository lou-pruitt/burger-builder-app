import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      initialized: false,
      error: null,
    };

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
      this.setState({ initialized: true });
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { initialized } = this.state;
      if (!initialized) return null;
      return (
        <div>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withErrorHandler;
