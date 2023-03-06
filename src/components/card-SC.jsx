import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../App.css';
function Card(props) {
    return (
        <Swiper

            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
        >
            {props.cardInfo.map((card) => (
                <SwiperSlide key={card.word}>
                    <div className="card">
                        <h2>{card.word}</h2>
                        <p>{card.definition}</p>
                        {card.sound && (
                            <div>
                                <audio controls>
                                    <source src={card.sound} type="audio/mpeg" />
                                </audio>
                                <h3>{card.greek}</h3>
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}


export default Card;
