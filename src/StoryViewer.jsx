import React from "react";
import PropTypes from "prop-types";

export default class StoryViewer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.onClose();
    }, 10000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { story, onClose } = this.props;
    return (
      <div className="story-viewer" onClick={onClose}>
        <div className="story-content" onClick={(e) => e.stopPropagation()}>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          
          <img src={story.image} alt="Story" />
          <p className="viewer-author">@{story.author}</p>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>
    );
  }
}

StoryViewer.propTypes = {
  story: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};