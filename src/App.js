import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import AllNotesPage from "./pages/AllNotes";
import AllStoriesPage from "./pages/AllStories";
import DashboardPage from "./pages/DashboardPage";
import DictionaryPage from "./pages/DictionaryPage";
import FlashCardsPage from "./pages/FlashCards";
import NewNotePage from "./pages/NewNote";
import NotFoundPage from "./pages/NotFound";
import StoryPage from "./pages/Story";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Study from "./components/Study";
import Layout from "./UI/Layout";
import PrivateRoute from "./utils/PrivertRoute";
import { fetchFlashcardsData } from "./app/flashcardsData-actions";
import FlashcardsLevel from "./components/FlashcardsLevel";

const App = () => {
  const dispatch = useDispatch();
  const user = localStorage.getItem("userName") ? localStorage.getItem("userName").split(".")[0] : null;

  const isLoading = useSelector(state => state.items.isLoading);
  const data = useSelector(state => state.items.words);

  useEffect(() => {
    !!user && dispatch(fetchFlashcardsData());
  }, [user]);
  
  return (
    isLoading && !!user ? <p>Loading ...</p> :
    <Layout className="App">
    <Switch>
      <Route path="/" exact>
        <DashboardPage />
      </Route>
      <Route path="/dictionary/:word?">
        <DictionaryPage />
      </Route>
      <Route path='/flashcards/practice/:level'>
        <FlashcardsLevel />
      </Route>
      <Route path="/flashcards/practice">
        <Study />
      </Route>
      <PrivateRoute path="/flashcards" >
        <FlashCardsPage />
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
