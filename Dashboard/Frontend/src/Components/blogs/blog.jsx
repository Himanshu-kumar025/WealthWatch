import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { tips, articles, ytData } from "./blogData.js"

export default function Blogs() {

    const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (src) => {
    setSelectedImage(src);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
<div className="flex flex-col md:flex-row w-full">

  {/* Blogs Container - Responsive */}
           <div className="bg-[#B8D7DE8C] dashboaard-right mb-[80px] rounded-md mt-4 h-full w-[85vw] md:w-[300px] pt-6 px-5 dashboard"
    style={{ position: "fixed", right: 0, overflowY: "auto" }}>
    <h1 className="text-3xl md:text-3xl text-shadow-md text-emerald-900 font-bold text-start ml-2" style={{marginBottom: "1.5rem"}}>
      Blogs
    </h1>

    {/* Article Section */}
    <div className="bg-white py-5 px-4 md:px-2 mb-6 rounded-2xl">
      <h1 className="text-start heading text-[1.4rem] font-semibold mb-4 px-2 md:px-8">
        Money guides 
      </h1>

<div className="relative">
  <Swiper
    modules={[Navigation, Pagination]}
    loop={true}
    navigation
    pagination={{ clickable: true }}
    breakpoints={{
      0: { slidesPerView: 1 },       // Default for all screen widths
      760: { slidesPerView: 2 },       // Default for all screen widths
      1300: { slidesPerView: 3 },    // Override when width is 1330px or more
    }}
    className="custom-swiper"
  >
          {articles.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="blogs w-[78%] max-[1300px]:w-[63%] max-[900px]:w-[68%] h-[360px] mx-auto mb-11 mt-2 pb-4 pt-4 px-4 rounded-[1rem]"
                style={{
                  boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.30)",
                  backgroundColor: "rgba(173, 216, 230, 0.15)",
                }}
              >
                <img
                  src={item.image}
                  alt="articles-image"
                  className="h-[190px] w-full object-cover rounded-[10px]"
                />
                <p className="mt-2 mb-4">{item.title}</p>

                <div className="text-end my-2 pb-2 pt-2">
                  <a
                    className="text-center text-white bg-[#2D5359] rounded-md px-4 py-2"
                    href={item.url}
                    target="_blank"
                  >
                    VISIT &nbsp;<i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>



          {/*  video Section */}
          <div className="bg-white py-5 px-2 my-8 rounded-2xl">
            <h1 className="heading text-[1.4rem] font-semibold text-start px-8 mb-4 ">Finance clips</h1>

<div className="relative">
  <Swiper
    modules={[Navigation, Pagination]}
    loop={true}
    navigation
    pagination={{ clickable: true }}
    breakpoints={{
      0: { slidesPerView: 1 },       // Default for all screen widths
      760: { slidesPerView: 2 },       // Default for all screen widths
      1300: { slidesPerView: 3 },    // Override when width is 1330px or more
    }}
    className="custom-swiper"
  >


                {ytData.map((item, index) => (

                  <SwiperSlide key={index}>
                    <div
                      // key={index}
                      className="videos w-[78%] max-[1300px]:w-[60%]  h-[300px] mx-auto mb-11 mt-2 pb-4 pt-4 px-4 rounded-[1rem]"
                      style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.30) " , backgroundColor: "rgba(173, 216, 230, 0.15)"}}
                    >
                      <div className="mb-6">
                        <div className=" h-[60%] flex flex-col">
                          <iframe
                            src={`${item.videoId}`}

                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-[58%px] h-full rounded-lg mb-3"
                          ></iframe>
                        </div>

                        <div className="mx-auto  mt-2">
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`${item.videoId}`}
                            className="text-black "
                          >
                            {item.title}
                          </a>
                        </div>
                      </div>
                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>


          {/* Financial Freedom Section */}
<div className="bg-white py-5 px-2 my-8 rounded-2xl w-full mb-[200px]" >
  <h1 className="heading text-[1.4rem] font-semibold text-start mb-4 px-2 sm:px-4 md:px-6">
    Ways to Achieve Financial Freedom
  </h1>

<div className="relative">
    <Swiper
      modules={[Navigation, Pagination]}
      loop={true}
      autoHeight={true}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
    breakpoints={{
      0: { slidesPerView: 1 },       // Default for all screen widths
      760: { slidesPerView: 2 },       // Default for all screen widths
      1300: { slidesPerView: 3 },    // Override when width is 1330px or more
    }}
      className="custom-swiper"
    >
      {tips.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className="tips w-[78%] max-[1300px]:w-[63%] h-[60vh] sm:w-[300px] md:w-[320px] mx-auto mb-12 mt-2 p-4 rounded-xl"
            style={{
              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "rgba(173, 216, 230, 0.15)",
            }}
          >
            <img
              src={item.image}
              alt="post Image"
              onClick={() => openImageModal(item.image)}
              className="w-full h-[42vh] object-cover rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
            />
            <p className="text-sm sm:text-base text-gray-800">{item.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Modal */}
  {selectedImage && (
    <div
      className="fixed inset-0 z-50 bg-opacity-40 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
    >
      {/* Close button */}
      <button
        onClick={closeImageModal}
        className="absolute top-17 left-8 text-white text-5xl font-bold z-50 hover:text-[#2D5359] transition-colors"
        aria-label="Close full screen image"
      >
        &times;
      </button>

      <img
        src={selectedImage}
        alt="Full"
        className="max-w-full max-h-[60vh] rounded-lg shadow-lg"
      />
    </div>
  )}
</div>



        </div>
      </div>
    </>
  )
}