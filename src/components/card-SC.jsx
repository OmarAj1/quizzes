import React, { useState } from 'react';
import Audio from './audio.component';

function Card({ word, definition, sound, greek }) {
    const [isFlipped, setIsFlipped] = useState(false);

    function handleCardClick() {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className={isFlipped ? 'card flipped' : 'card'} onClick={handleCardClick}>
            <div className="card-front">
                <p>{word}</p>
            </div>
            <div className="card-back">
                <p>{word}: {definition}</p>
                {sound && (
                    <div className='spell'>
                        <Audio audioUrl={sound} />
                        <h3>{greek}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
