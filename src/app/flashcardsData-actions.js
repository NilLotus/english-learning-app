import { flashcardsActions } from "./flashcardsItems-slice";

let id;
if (localStorage.getItem("userName")) {
  id = localStorage.getItem("userName").split(".")[0];
}
let url = "https://english-learning-app-7a7b2-default-rtdb.firebaseio.com/";

export const fetchFlashcardsData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(url + id + ".json");
      if (!response.ok) {
        throw new Error("Something went wrong in fetching data!");
      }
      const data = await response.json();
      console.log({ data });
      const items = Object.values(data);
      return items;
    };
    try {
      const data = await fetchRequest();
      if (data.length > 0) {
        dispatch(flashcardsActions.replace(data));
      } else {
        dispatch(flashcardsActions.replace([]));
      }
    } catch (e) {
      console.log({ e });
    }
  };
};
export const sendFlashcardsData = (item) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(url + id + ".json", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({ id });
      if (!response.ok) {
        throw new Error("Something went wrong in sending data!");
      }
    };
    try {
      await sendRequest();
    } catch (e) {
      console.log({ e });
    }
  };
};
