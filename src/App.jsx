import React, { useEffect, useState } from "react";
import Card from './components/card-SC';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import audio from "./components/audio.component";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import './App.css';

function App() {
  const [mockData, setMockData] = useState([]);
  const [defs, setDefs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMockData() {
      try {
        const response = await fetch(
          'https://63f75b7ae40e087c958cdca4.mockapi.io/sport'
        );
        const data = await response.json();
        setMockData(data);
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
              return {
                word: el.word,
                definition: 'not found',
              };
            }
            const res = {
              word: data[0].word,
              definition: data[0].meanings[0].definitions[0].definition,
              sound: data[0]?.phonetics[0]?.audio,
              greek: data[0]?.phonetics[1]?.text,
            };
            return res;
          })
      );

      Promise.all(promises).then((definitions) => {
        setDefs(definitions);
        setIsLoading(false);
      });
    }
  }, [mockData]);

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Swiper>
          {mockData.map((data, index) => (
            <SwiperSlide key={index}>
              <Card
                word={data.word}
                definition={defs[index].definition}
                sound={defs[index].sound}
                greek={defs[index].greek}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default App;
