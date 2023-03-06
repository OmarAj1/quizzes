// import { useEffect, useState } from 'react';
// import './App.css';

import { useEffect, useState } from "react";

// function App() {
//   const [mockData, setMockData] = useState([]);
//   const [Defs, setDefs] = useState([]);
//   const [word, setWord] = useState();
//   const [resWord, setRes] = useState([]);
//   useEffect(() => {
//     async function fetchMockData() {
//       try {
//         const response = await fetch('https://63f75b7ae40e087c958cdca4.mockapi.io/sport');
//         const data = await response.json();
//         setMockData(data);
//         setWord(true)
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchMockData();
//   }, []);

//   const newDefs = [];
//   useEffect(() => {
//     if (mockData.length > 0) {
//       for (let index = 0; index < mockData.length; index++) {
//         const el = mockData[index];
//         const response = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${el.word}`)
//           .then(result => {
//             return result.json()
//           }).then(data => {

//             if (data.title === "No Definitions Found") {
//               return "not found"
//             }
//             const res = {
//               word: data[0].word,
//               definition: data[0].meanings[0].definitions[0].definition
//             }

//             return newDefs.push(res);
//           })


//       }
//       setDefs(newDefs)
//       console.log(newDefs);
//       setRes(newDefs)
//       // setRes()
//     }

//   }, [mockData]);

//   return (
//     <div className="App">
//       <h1>Mockapi Words and Definitions</h1>
//       <>{typeof resWord}</>
//     </div>
//   );
// }

// export default App;
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
            const res = {
              word: data[0].word,
              definition: data[0].meanings[0].definitions[0].definition,
            };
            return res;
          })
      );
      Promise.all(promises).then((definitions) => {
        setDefs(definitions);
        setRes(
          definitions.map((d) => (
            <div key={d.word}>
              <h2>{d.word}</h2>
              <p>{d.definition}</p>
            </div>
          ))
        );
      });
      // used to wait for all the promises to resolve.
      // When all the promises are resolved, the state is updated with the array of definitions
    }
  }, [mockData]);

  return (
    <div className="App">
      <h1>Mockapi Words and Definitions</h1>
      {resWord}
    </div>
  );
}

export default App;
