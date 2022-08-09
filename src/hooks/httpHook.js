import { useState } from "react";

const useHttp = (props) => {
  const [wordMeanings, setWordMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [wordTitle, setWordTitle] = useState("");
  const [pronunciations, setPronunciations] = useState([]);
  const [error, setError] = useState(null);
  const sendRequest = async (word) => {
    try {
      setError(null);
      if (word === "") {
        setWordMeanings([]);
      } else {
        const request = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const response = await request.json();
        if (response["title"] === "No Definitions Found") {
          setWordTitle("");
          setWordMeanings([]);
          throw new Error(response["message"]);
        } else {
          setWordTitle(word);
          setWordMeanings(response[0].meanings);
          let audios = [];
          let phoneticsText = [];
          response[0].phonetics.forEach((phonetic) => {
            if (phonetic.audio) {
              audios.push(phonetic.audio);
            }
            if (phonetic.text) {
              phoneticsText.push(phonetic.text);
            }
          });
          setPronunciations(audios);
          setPhonetics(phoneticsText);
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return {
    sendRequest,
    wordTitle,
    wordMeanings,
    phonetics,
    pronunciations,
    error,
  };
};

export default useHttp;
