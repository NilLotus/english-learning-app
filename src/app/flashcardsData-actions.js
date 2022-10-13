import { flashcardsActions } from "./flashcardsItems-slice";

let id, userId ;
let url = "https://english-learning-app-dfa2a-default-rtdb.firebaseio.com/";

export const fetchFlashcardsData = () => {
  if (localStorage.getItem("userName")) {
   id = localStorage.getItem("userName").split(".")[0];
  }
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(url + id + ".json");
      if (!response.ok) {
        throw new Error("Something went wrong in fetching data!");
      }
      const data = await response.json();
      const keys = Object.keys(data);
      const values = Object.values(data);
      values.map((val, index) => {val['key']=keys[index]})
      return values;
    };
    try {
      const data = await fetchRequest();
      if (data.length > 0) {
        dispatch(flashcardsActions.replace({data: data, id:id, isLoading: false}));
      } else {
        dispatch(flashcardsActions.replace({data: [], id:id, isLoading: false}));
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
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(url + userId + ".json", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log({item});
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
export const updateFlashcardsData = (item) =>{
  if (localStorage.getItem("userName")) {
    userId = localStorage.getItem("userName").split(".")[0];
 }
 return async () => {
   const updateRequest = async () => {
     const response = await fetch(url + userId + '/' + item.key + ".json", {
       method: "PUT",
       body: JSON.stringify(item),
       headers: {
         "Content-Type": "application/json",
       },
     });
     if (!response.ok) {
       throw new Error("Something went wrong in updating data!");
     }
   };
   try {
     await updateRequest();
   } catch (e) {
     console.log({ e });
   }
 };
}
