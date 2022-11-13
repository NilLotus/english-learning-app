import { useHistory } from "react-router-dom";
import {HiOutlineCheck} from 'react-icons/hi';

import Card from "../UI/Card";
import Tooltip from "../UI/Tooltip";
import classes from "./StoryItem.module.css";

const StoryItem = (props) => {
  const history = useHistory();

  const showStoryDetailHandler = () => {
    history.push(`/stories/${props.id}`);
  };
  return (
    <Card className={classes["story-item"]} onClick={showStoryDetailHandler}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${props.imageSrc})` }}
      >
        <div className={classes.description}>
          {props.read && (
            <Tooltip className={classes["read-mark"]} title='Read'>
              <HiOutlineCheck />
            </Tooltip>
          )}
          <h4 className={classes.title}>{props.name}</h4>
          <p className={classes["writer-detail"]}>
            Written by:<i className={classes.writer}>{props.writer}</i>
          </p>
        </div>
      </div>
    </Card>
  );
};
export default StoryItem;
