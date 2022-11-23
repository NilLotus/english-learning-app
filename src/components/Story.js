import StoryItem from "./StoryItem";
import classes from "./Story.module.css";

const Story = (props) => {
  return (
    <div>
      <h2 className={classes['stories-title']}>Stories</h2>
      <div  className={classes.story}>
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
      </div>
    </div>
  );
};
export default Story;