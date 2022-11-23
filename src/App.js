import { Route, Switch, Redirect } from "react-router-dom";
import React, { useContext, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import AuthContext from "./store/Auth-context";
import Layout from "./UI/Layout";
import { fetchFlashcardsData } from "./app/flashcardsData-actions";
import { fetchStories, fetchStoryDetail } from "./app/story-actions";

const Dictionary = React.lazy(() => import("./components/Dictionary"));
const Flashcards = React.lazy(() => import("./components/Flashcards"));
const Story = React.lazy(() => import("./components/Story"));
const StoryDetail = React.lazy(() => import("./components/StoryDetail"));
const FlashcardsLevel = React.lazy(() =>
  import("./components/FlashcardsLevel")
);
const PrivateRoute = React.lazy(() => import("./utils/PrivertRoute"));
const SignInPage = React.lazy(() => import("./pages/SignIn"));
const SignUpPage = React.lazy(() => import("./pages/SignUp"));
const NotFoundPage = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.words);
  const stories = useSelector((state) => state.story.stories);
  const storyDetailPerUser = useSelector((state) => state.story.detailPerUser);
  const ctx = useContext(AuthContext);
  const isLoading = useSelector((state) => state.items.isLoading);
  const check = ctx.check();

  if(storyDetailPerUser.length === 0 && localStorage.getItem('userName')){
    dispatch(fetchStoryDetail())
  }

  if (items.length === 0 && isLoading) {
    check && dispatch(fetchFlashcardsData());
  }

  if (stories.length === 0) {
    dispatch(fetchStories());
  }

  return isLoading && ctx.isLoggedIn ? (
    <p>Loading ...</p>
  ) : (
    <Layout className="App">
      <Suspense Redirect={<div>Loading...</div>}>
        <Switch>
          {/* <Route path="/home" exact>
        <DashboardPage />
      </Route> */}
          <Route path="/dictionary/:word?">
            <Dictionary />
          </Route>
          <PrivateRoute path="/flashcards/practice/:level">
            <FlashcardsLevel />
          </PrivateRoute>
          <PrivateRoute path="/flashcards">
            <Flashcards />
          </PrivateRoute>
          <Route path="/stories/:storyId">
            <StoryDetail />
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
          <Route exact path="/">
            <Redirect to="/dictionary" />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;