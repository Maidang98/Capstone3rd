export const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "20px",
      }
    }
  ]
};

responsive: [
  {
    breakpoint: 1200, // Bootstrap extra large
    settings: { slidesToShow: 4 }
  },
  {
    breakpoint: 992, // Bootstrap large
    settings: { slidesToShow: 3 }
  },
  {
    breakpoint: 768, // Bootstrap medium
    settings: { slidesToShow: 2 }
  },
  {
    breakpoint: 576, // Bootstrap small
    settings: {
      slidesToShow: 1,
      centerMode: true,
      centerPadding: "20px",
    }
  }
]
