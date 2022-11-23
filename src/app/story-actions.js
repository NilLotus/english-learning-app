import { storyAction } from "./story-slice";

let userId;
let url = "https://english-learning-app-dfa2a-default-rtdb.firebaseio.com/";

export const fetchStories = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(url + "stories.json");
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
export const fetchStoryDetail = () => {
  if (localStorage.getItem("userName")) {
    userId = localStorage.getItem("userName").split(".")[0];
  }
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(url + 'users/' + userId + '/storyDetail.json');
      if (!response.ok) {
        throw new Error("Something went wrong in fetching story data!");
      }
      const data = await response.json();
      const keys = Object.keys(data);
      const values = Object.values(data);
      values.map((item, index) => {
        item["key"] = keys[index];
      });
      return values;
    };
    try {
      const data = await fetchRequest();
      dispatch(storyAction.replaceDetail({ data: data, isLoading: false }));
    } catch (e) {
      console.log(e);
    }
  };
};
export const sendStoryDetail = (storyDetail) => {
  if (localStorage.getItem("userName")) {
    userId = localStorage.getItem("userName").split(".")[0];
  }
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        url + "users/" + userId + "/storyDetail.json",
        {
          method: "POST",
          body: JSON.stringify(storyDetail),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong in sending story detail!");
      }
      const data = response.json();
      return data;
    };
    try {
      const data = await sendRequest();
      const newStoryDetail = {...storyDetail};
      newStoryDetail['key'] = data.name;
      dispatch(storyAction.addDetail(newStoryDetail))
    } catch (e) {
      console.log(e);
    }
  };
};
export const updateStoryDetail = (storyDetail) => {
  if (localStorage.getItem("userName")) {
    userId = localStorage.getItem("userName").split(".")[0];
  }
  return async (dispatch) => {
    const updateRequest = async () => {
      const newStoryDetail = { ...storyDetail };
      newStoryDetail.read = !newStoryDetail.read;
      const response = await fetch(url + 'users/' + userId + '/storyDetail/' + newStoryDetail.key + '.json',
        {
          method: "PUT",
          body: JSON.stringify(newStoryDetail),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went worng in updading story!");
      }
      return newStoryDetail;
    };
    try {
      const data = await updateRequest();
      dispatch(storyAction.updateDetail(data));
    } catch (e) {
      console.log(e);
    }
  };
};
