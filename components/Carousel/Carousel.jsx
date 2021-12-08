import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Card from "./CarouselCard.jsx";

const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosNewOutlinedIcon
        style={{ color: "black", fontSize: "20px" }}
      />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosOutlinedIcon
        style={{ color: "black", fontSize: "20px" }}
      />
    </div>
  );
};

const carouselProperties = {
  dots: true,
  variableWidth: true,
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 5,
  infinite: true,
  slidesToScroll: 5,
  centerMode: false,
  centerPadding: "170px",
  mobileFirst: true,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        slidesToScroll: 1,
      },
    },
  ],
};

function Carousel({ eventCategoryData, selectedEvent, handleSelectedEvent }) {
  return (
    <div style={{ margin: "10px" }} className={styles.carousel}>
      <Slider {...carouselProperties}>
        {eventCategoryData.map((item, id) => (
          <Card
            imgSrc={item.imgSrc}
            key={`${item.id}_${id}`}
            id={`${item.id}_${id}`}
            title={item.title}
            handleSelectedEvent={handleSelectedEvent}
            isSelectedEvent={selectedEvent == id}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
