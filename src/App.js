import { Route, Switch, useHistory } from "react-router-dom";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import AuthContext from "./store/Auth-context";
import DashboardPage from "./pages/DashboardPage";
import Dictionary from "./components/Dictionary";
import Flashcards from "./components/Flashcards";
import NotFoundPage from "./pages/NotFound";
import Story from "./components/Story";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Storydetail from "./components/StoryDetail";
import Layout from "./UI/Layout";
import PrivateRoute from "./utils/PrivertRoute";
import FlashcardsLevel from "./components/FlashcardsLevel";
import { fetchFlashcardsData } from "./app/flashcardsData-actions";
import { fetchStories } from "./app/story-actions";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(state => state.items.words)
  const stories = useSelector(state => state.story.stories)
  const ctx = useContext(AuthContext);
  const isLoading = useSelector(state => state.items.isLoading);
  const check = ctx.check();

  if (items.length === 0 && isLoading) {
    check && dispatch(fetchFlashcardsData());
  }

  if(stories.length === 0){
    console.log('lll');
    dispatch(fetchStories())
  }
  
  return (
    isLoading && ctx.isLoggedIn ? <p>Loading ...</p> :
    <Layout className="App">
    <Switch>
      <Route path="/" exact>
        <DashboardPage />
      </Route>
      <Route path="/dictionary/:word?">
        <Dictionary />
      </Route>
      <PrivateRoute path='/flashcards/practice/:level'>
        <FlashcardsLevel />
      </PrivateRoute>
      <PrivateRoute path="/flashcards" >
        <Flashcards />
      </PrivateRoute>
      <Route path='/stories/:storyId' >
        <Storydetail/>
      </Route>
      <Route path="/stories">
        <Story stories={stories} />
      </Route>
      <Route path="/sign-in">
        <SignInPage />
      </Route>
      <Route path="/sign-up">
        <SignUpPage />
      </Route>

      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </Layout>
  );
};

export default App;
