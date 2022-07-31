import { IoVolumeMediumOutline } from "react-icons/io5";

import classes from "./Audio.module.css";

const Pronounce = (props) => {
  let audio = props.pronunciations.map((audio) => {
    const addAudio = new Audio(audio);
    let className = "";
    let pronounceTitle = "";
    if (audio.includes("us.mp3")) {
      className = classes.american;
      pronounceTitle = "American";
    } else if (audio.includes("uk.mp3")) {
      className = classes.british;
      pronounceTitle = "British";
    } else if (audio.includes("au.mp3")) {
      className = classes.australian;
      pronounceTitle = "Australian";
    }
    return (
      <IoVolumeMediumOutline
        key={Math.random().toString()}
        onClick={() => addAudio.play()}
        className={classes.Audio + " " + className}
        title={pronounceTitle}
      />
    );
  });
  return <>{audio}</>;
};
export default Pronounce;
