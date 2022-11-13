import StoryItem from "./StoryItem";
import Card from "../UI/Card";
import classes from "./Story.module.css";

const Story = (props) => {
  return (
    <div>
      <h2 className={classes['stories-title']}>Stories</h2>
      <Card  className={classes.story}>
        {props.stories.map((story) => {
          return (
            <StoryItem
              name={story.name}
              imageSrc={story.image}
              id={story.id}
              key={story.id}
              read={story.read}
              writer={story.writer}
            />
          );
        })}
      </Card>
    </div>
  );
};
export default Story;
