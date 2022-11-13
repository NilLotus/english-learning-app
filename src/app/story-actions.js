import { storyAction } from "./story-slice";

export const fetchStories = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        "https://english-learning-app-dfa2a-default-rtdb.firebaseio.com/stories.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong in fetching story data!");
      }
      const data = await response.json();
      const keys = Object.keys(data);
      const values = Object.values(data);
      values.map((item, index) => {
        item["id"] = keys[index];
      });
      return values;
    };
    try {
      const data = await fetchRequest();
      dispatch(storyAction.replace({ data: data, isLoading: false }));
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateStories = (story) => {
    return async (dispatch) =>{
      const updateRequest = async () => {
        const newStory = { ...story };
        newStory.read = !newStory.read;
        const response = await fetch(
          `https://english-learning-app-dfa2a-default-rtdb.firebaseio.com/stories/${story.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify(newStory),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went worng in updading story!");
        }
      };
      try {
        await updateRequest();
        dispatch(storyAction.update(story))
      } catch (e) {
        console.log(e);
      }
    }
  };
