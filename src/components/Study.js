import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../UI/Card";

const Study = () => {
  const studyLevels = [0, 1, 2, 3, 4];
  const items = useSelector((state) => state.items.words);

  const content = studyLevels.map((i) => {
    const quantity = items.filter((item) => item.level === i).length;
    return (
      <Link to={`/flashcards/practice/level-${i + 1}`} key={i}>
        <Card>
          <h3>{`Level ${i + 1}`}</h3>
          <span>{quantity} words</span>
        </Card>
      </Link>
    );
  });

  return <ul>{content}</ul>;
};
export default Study;
