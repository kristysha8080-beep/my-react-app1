import React from "react";
import PropTypes from "prop-types";

export default class AddStoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: "" };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.imageUrl.trim()) {
      this.props.onAdd(this.state.imageUrl, this.props.author);
      this.setState({ imageUrl: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-story-form">
        <input
          type="url"
          placeholder="Вставьте ссылку на картинку (URL)"
          value={this.state.imageUrl}
          onChange={(e) => this.setState({ imageUrl: e.target.value })}
          required
        />
        <button type="submit">Опубликовать</button>
      </form>
    );
  }
}

AddStoryForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
};