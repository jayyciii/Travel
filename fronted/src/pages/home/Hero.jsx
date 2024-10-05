import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import c from "../../assets/hero-carousel/c.jpg"
import e from "../../assets/hero-carousel/e.jpg"
import f from "../../assets/hero-carousel/f.jpg"
import y from "../../assets/hero-carousel/y.jpg"


import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';


const Hero = () => {
    return (
        <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
            <div className='md:w-1/2 w-full text-center'>
                <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>Travel with SaiGon Tourist</h1>
                <p className='py-4'>Khám phá thế giới đầy màu sắc, nơi mỗi hành trình đều trở thành một ký ức đẹp. Chia sẻ ký ức, kết nối du khách.Hành trình đích thực bắt đầu từ đây , hãy đi và để cuộc sống đầy màu sắc!</p>
            </div>

            <div className='md:w-1/2 w-full mx-auto'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination ,Autoplay ]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <img src={c} alt="" className='w-full lg:h-[420px] sm:h-96 h-80'/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={e} alt="" className='w-full lg:h-[420px] sm:h-96 h-80'/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={f} alt="" className='w-full lg:h-[420px] sm:h-96 h-80'/>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={y} alt="" className='w-full lg:h-[420px] sm:h-96 h-80'/>
                    </SwiperSlide>
                   
                </Swiper>

        </div>
    </div >
  )
}

export default Hero