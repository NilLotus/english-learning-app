import { flashcardsActions } from "./flashcardsItems-slice";

let id, userId;
let url = "https://english-learning-app-dfa2a-default-rtdb.firebaseio.com/";

export const fetchFlashcardsData = () => {
  if (localStorage.getItem("userName")) {
    id = localStorage.getItem("userName").split(".")[0];
  } else return;
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(url + id + ".json");
      if (!response.ok) {
        throw new Error("Something went wrong in fetching data!");
      }
      const data = await response.json();
      if(!!data){
        const keys = Object.keys(data);
        const values = Object.values(data);
        values.map((item, index) =>{
          item['key'] = keys[index];
        })
        return values;
      }
    };
    try {
      const data = await fetchRequest();
      if (!!data && data.length > 0) {
        dispatch(
          flashcardsActions.replace({ data: data, isLoading: false })
        );
      } else {
        dispatch(
          flashcardsActions.replace({ data: [], isLoading: false })
        );
      }
    } catch (e) {
      // TODO: show error in a way except log
      console.log({ e });
    }
  };
};
export const sendFlashcardsData = (item) => {
  if (localStorage.getItem("userName")) {
    userId = localStorage.getItem("userName").split(".")[0];
  }
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(url + userId + ".json", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong in sending data!");
      }
      return response.json();
    };
    try {
      const dateKey = await sendRequest();
      item["key"] = dateKey.name;
      dispatch(flashcardsActions.add(item));
    } catch (e) {
      console.log({ e });
    }
  };
};
export const updateFlashcardsData=(item) =>{
  if (localStorage.getItem("userName")) {
    userId = localStorage.getItem("userName").split(".")[0];
  }
  return async () => {
    const updateRequest = async () => {
      const newItem = {...item};
      delete newItem.key;
      const response = await fetch(url + userId + '/' + item.key + ".json", {
        method: "PUT",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong in sending data!");
      }
    };
    try {
      await updateRequest();
    } catch (e) {
      console.log({ e });
    }
  };
} 
