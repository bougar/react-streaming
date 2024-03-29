import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { getStream, updateStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.updateStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.stream, "title", "description")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const streamId = ownProps.match.params.id;
  return { stream: state.streams[streamId] };
};

export default connect(mapStateToProps, { getStream, updateStream })(
  StreamEdit
);
