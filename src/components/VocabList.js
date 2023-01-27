import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck } from "react-icons/md";

import Vocabulary from "./Vocabulary";
import Guide from "./Guide";
import classes from "./VocabList.module.css";

const VocabularyList = () => {
  const items = useSelector((state) => state.items.words);
  let vocabulary = (
    <ul className={classes.list}>
      {items.map((element) => {
        return (
          <li key={element.word}>
            <Vocabulary item={element} />
          </li>
        );
      })}
    </ul>
  );
  const drawerContent = (
    <ul>
      <li>
        If you have already added some words to your flashcard (via the
        dictionary page), you can see your entire list in <b>Vocabulary List</b>{" "}
        tab.
      </li>
      <li>
        To delete an item from your list you can click on <RiDeleteBin6Line />{" "}
        button.
      </li>
      <li>
        To add a note or meaning in your own language to an item, click the{" "}
        <AiOutlineEdit /> button, then enter your note in the input, then
        press the <MdCheck /> button, and your note will appear in front of the
        word.
      </li>
    </ul>
  );

  return (
    <>
      <Guide drawerHeader="Vocabulary List" drawerContent={drawerContent} />
      {items.length > 0 ? (
        vocabulary
      ) : (
        <div className={classes.empty}>
          <i>You have not added any vocabulary to flashcards!</i>
        </div>
      )}
    </>
  );
};
export default VocabularyList;
