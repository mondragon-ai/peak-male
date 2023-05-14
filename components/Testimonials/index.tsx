import React, { useState, useEffect } from "react";
import styles from "./Testimonials.module.css";
import TestimonialItem from "@/components/TestimonialItem";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
// import { Rate } from "antd";

interface Testimonial {
  id: number;
  src: string;
  author: string;
  rating: number;
  title: string;
  description: string;
}

const testimonialData = [
  {
    id: 1,
    src: "/images/package-1.png",
    author: "Ebuka",
    title: "Quality CBD and fast shipping",
    rating: 5,
    description:
      "These are my husband’s favorite.  He likes the flavor.  They do have sugar all over them.",
  },
  {
    id: 2,
    src: "/images/package-1.png",
    author: "James",
    title: "Quality CBD and fast shipping",
    rating: 5,
    description:
      "These are my husband’s favorite.  He likes the flavor.  They do have sugar all over them.",
  },
  {
    id: 3,
    src: "/images/package-1.png",
    author: "sammy",
    title: "Quality CBD and fast shipping",
    rating: 5,
    description:
      "These are my husband’s favorite.  He likes the flavor.  They do have sugar all over them.",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  //   const [totalPages, setTotalPages] = useState(0);

  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>(
    []
  );

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex + 1
    );
  };

  useEffect(() => {
    const calculateVisibleTestimonials = () => {
      const isMobile = window.innerWidth;
      const testimonialsPerPage =
        isMobile <= 780 ? 1 : isMobile <= 1200 ? 2 : 3;

      const startIndex = activeIndex - (activeIndex % testimonialsPerPage);
      const endIndex = startIndex + testimonialsPerPage;
      const visibleTestimonials = testimonialData.slice(startIndex, endIndex);
      setVisibleTestimonials(visibleTestimonials);

      //   setTotalPages(Math.ceil(testimonialData.length / testimonialsPerPage));
    };
    calculateVisibleTestimonials();
  }, [activeIndex]);

  return (
    <div className={styles.testimonials}>
      <h3>What Our Customers Say</h3>
      <div className={styles.testimonialsCounts}>
        <div>Real Reviews from Real Costumers</div>
        <div>
          {/* <Rate
            allowHalf
            disabled
            defaultValue={5}
            style={{ color: "#FFA41C" }}
          />{" "} */}
          {"1246 Reviews "} <FaLessThan />
          <FaGreaterThan />
        </div>
      </div>
      <div>
        <div className={styles.lessThan}>
          {" "}
          <FaLessThan onClick={handlePrev} />
        </div>
        <div className={styles.testimonialList}>
          {visibleTestimonials.map((data) => (
            <TestimonialItem key={data.id} data={data} />
          ))}
        </div>
        <div className={styles.greaterThan}>
          <FaGreaterThan onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
