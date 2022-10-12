import { useSelector } from "react-redux";

const VocabularyList = () => {
  const items = useSelector((state) => state.items.words);
  let vocabulary = (
    <ul>
      {items.map((element) => {
        return <li key={element.id}>{element.word}</li>;
      })}
    </ul>
  );

  return <div>{items.length > 0 && vocabulary}</div>;
};
export default VocabularyList;
