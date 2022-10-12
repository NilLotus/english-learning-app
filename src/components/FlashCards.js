import { Link, Route, Switch } from "react-router-dom";
import VocabularyList from "./VocabList";

const FlashCards = () => {
  return (
    <div>
      <h2>FlashCards</h2>
      <Link to={`/flashcards/vocabulary-list`}>Vocabulary List</Link>
      <Link to={`/flashcards/practice`}>Practice</Link>

      <Switch>
        <Route path={`/flashcards/vocabulary-list`}>
          <VocabularyList />
        </Route>
      </Switch>
    </div>
  );
};
export default FlashCards;
