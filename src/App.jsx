import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [mockData, setMockData] = useState([]);
  const [Defs, setDefs] = useState([]);
  const [word, setWord] = useState();
  const [resWord, setRes] = useState([]);

  useEffect(() => {
    async function fetchMockData() {
      try {
        const response = await fetch('https://63f75b7ae40e087c958cdca4.mockapi.io/sport');
        const data = await response.json();
        setMockData(data);
        setWord(true);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMockData();
  }, []);

  useEffect(() => {
    if (mockData.length > 0) {
      const promises = mockData.map((el) =>
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${el.word}`)
          .then((result) => result.json())
          .then((data) => {
            if (data.title === 'No Definitions Found') {
              return { word: el.word, definition: 'not found' };
            }
            console.log(data[0].phonetics[0]);
            const res = {
              word: data[0].word,
              definition: data[0].meanings[0].definitions[0].definition,
              sound: data[0].phonetics[0].audio
            };
            return res;
          })
      );
      // console.log(definitions);

      Promise.all(promises).then((definitions) => {
        console.log(definitions);
        setDefs(definitions);
        setRes(
          definitions.map((d) => (
            <div key={d.word}>
              <h2>{d.word}</h2>
              <p>{d.definition}</p>
              <audio controls>
                <source src={d.sound} type="audio/mpeg" />
              </audio>
            </div>
          ))

        );
      });
      // console.log(res);
      // used to wait for all the promises to resolve.
      // When all the promises are resolved, the state is updated with the array of words and defs
    }
  }, [mockData]);

  return (
    <div className="App">
      <h1>Mockapi Words and Definitions</h1>
      {resWord[0]}
    </div>
  );
}

export default App;
