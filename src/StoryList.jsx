import React from "react";
import PropTypes from "prop-types";

export default function StoryList({ stories, onView }) {
  return (
    <div className="story-list">
      {stories.map((story) => (
        <div
          key={story.id}
          className="story-item"
          onClick={() => onView(story)}
        >
          <div className={`avatar-ring ${story.viewed ? "viewed" : ""}`}>
            <img src={story.avatar} alt={story.author} />
          </div>
          <p>{story.author}</p>
        </div>
      ))}
    </div>
  );
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      viewed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onView: PropTypes.func.isRequired,
};