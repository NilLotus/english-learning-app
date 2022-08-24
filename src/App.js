import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
import Layout from "./UI/Layout";
import PrivateRoute from "./utils/PrivertRoute";
import { fetchFlashcardsData } from "./app/flashcardsData-actions";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFlashcardsData());
  }, [dispatch]);
  return (
    <Layout className="App">
      <Switch>
        <Route path="/" exact>
          <DashboardPage />
        </Route>
        <Route path="/dictionary/:word?">
          <DictionaryPage />
        </Route>
        <PrivateRoute path="/flashcards">
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
        <Route path="/story:storyName">
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
