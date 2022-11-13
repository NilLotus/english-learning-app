import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import { updateStories } from "../app/story-actions";
import Tooltip from "../UI/Tooltip";
import classes from "./StoryDetail.module.css";

const Storydetail = () => {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState("28px");
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.story.stories);
  const isLoading = useSelector((state) => state.story.isLoading);
  const storyIndex = stories.findIndex((item) => item.id === params.storyId);

  if (fontSize > 10 && fontSize < 17 && lineHeight !== "28px") {
    setLineHeight("28px");
  }
  if (fontSize > 16 && fontSize < 29 && lineHeight !== "42px") {
    setLineHeight("42px");
  }
  if (fontSize > 28 && fontSize < 37 && lineHeight !== "52px") {
    setLineHeight("52px");
  }
  const decreaseFontSize = () => {
    setFontSize((prevState) => {
      return prevState - 1;
    });
  };
  const increaseFontSize = () => {
    setFontSize((prevState) => {
      return prevState + 1;
    });
  };
  const backToStoriesHandler = () => {
    history.push("/stories");
  };
  const toggleReadHandler = () => {
    dispatch(updateStories(stories[storyIndex]));
  };
  return (
    !isLoading && (
      <div className={classes["story-detail"]}>
        <div className={classes.detail}>
          <div className={classes.actions}>
            <Tooltip
              className={classes["back-btn"]}
              onClick={backToStoriesHandler}
              title="Back"
            >
              <IoArrowBack />
            </Tooltip>
            <button className={classes.mark} onClick={toggleReadHandler}>
              {stories[storyIndex]["read"] ? "Mark as unread" : "Mark as read"}
            </button>
          </div>
          <img className={classes.image} src={stories[storyIndex]["image"]} />
          <audio className={classes.audio} controls>
            <source src={stories[storyIndex]["audio"]} />
          </audio>
          <div className={classes.font}>
            <div>
              <span>Font Size:</span>
              <span className={classes['font-size']}>{fontSize - 9}</span>
            </div>
            <div className={classes["font-actions"]}>
              <button onClick={decreaseFontSize} disabled={fontSize === 10}>
                -
              </button>
              <button className={classes.default} onClick={() => setFontSize(16)}>Default</button>
              <button onClick={increaseFontSize} disabled={fontSize === 36}>
                +
              </button>
            </div>
          </div>
        </div>
        <div
          className={classes.script}
          style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
        >
          <div className={classes.name}>
            {stories[storyIndex]["name"]}
            <span className={classes.author}>
              (By: <i>{stories[storyIndex]["writer"]}</i>)
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: stories[storyIndex]["script"],
            }}
          />
        </div>
      </div>
    )
  );
};
export default Storydetail;
