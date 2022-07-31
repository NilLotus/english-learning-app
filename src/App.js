import { Route, Switch } from "react-router-dom";

import "./App.css";
import AllNotesPage from "./pages/AllNotes";
import AllStoriesPage from "./pages/AllStories";
import DashboardPage from "./pages/DashboardPage";
import DictionaryPage from "./pages/DictionaryPage";
import FlashCardsPage from "./pages/FlashCards";
import NewNotePage from "./pages/NewNote";
import NotFoundPage from "./pages/NotFound";
import StoryPage from "./pages/Story";
import Layout from "./UI/Layout";

function App() {
  return (
    <Layout className="App">
      <Switch>
        <Route path="/" exact>
          <DashboardPage/>
        </Route>
        <Route path="/dictionary/:word?" >
          <DictionaryPage/>
        </Route>
        <Route path="/flashcards">
          <FlashCardsPage />
        </Route>
        <Route path="/notes">
          <AllNotesPage />
        </Route>
        <Route path="/new-note">
          <NewNotePage />
        </Route>
        <Route path="/stories">
          <AllStoriesPage />
        </Route>
        <Route path="/story:storyName">
          <StoryPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
