import { Route, Switch } from "react-router-dom";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import AuthContext from "./store/Auth-context";
import AllNotesPage from "./pages/AllNotes";
import AllStoriesPage from "./pages/AllStories";
import DashboardPage from "./pages/DashboardPage";
import DictionaryPage from "./pages/DictionaryPage";
import FlashcardsPage from "./pages/Flashcards";
import NewNotePage from "./pages/NewNote";
import NotFoundPage from "./pages/NotFound";
import StoryPage from "./pages/Story";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Layout from "./UI/Layout";
import PrivateRoute from "./utils/PrivertRoute";
import { fetchFlashcardsData } from "./app/flashcardsData-actions";
import FlashcardsLevel from "./components/FlashcardsLevel";

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items.words)
  const ctx = useContext(AuthContext);
  console.log(items);
  const isLoading = useSelector(state => state.items.isLoading);
  const check = ctx.check();

  if (items.length === 0 && isLoading) {
    check && dispatch(fetchFlashcardsData());
  }
  
  return (
    isLoading && ctx.isLoggedIn ? <p>Loading ...</p> :
    <Layout className="App">
    <Switch>
      <Route path="/" exact>
        <DashboardPage />
      </Route>
      <Route path="/dictionary/:word?">
        <DictionaryPage />
      </Route>
      <PrivateRoute path='/flashcards/practice/:level'>
        <FlashcardsLevel />
      </PrivateRoute>
      <PrivateRoute path="/flashcards" >
        <FlashcardsPage />
      </PrivateRoute>
      <PrivateRoute path="/notes">
        <AllNotesPage />
      </PrivateRoute>
      <Route path="/new-note">
        <NewNotePage />
      </Route>
      <Route path="/stories">
        <AllStoriesPage />
      </Route>
      <Route path="/stories/:storyName">
        <StoryPage />
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
