import React from "react";
import { useSelector } from "react-redux";
import ClassCard from "../components/ClassCard";
import BookingTabs from "../components/BookingTabs";

const MyBookings = () => {
  const globalklass = useSelector((state) => state.klass);
  const enrolledKlasses = globalklass.enrolledKlasses;
  console.log(enrolledKlasses);
  return (
    <div>
      <BookingTabs />
      {enrolledKlasses.map((enrolledKlass) => (
        <ClassCard key={enrolledKlass.id} klass={enrolledKlass} />
      ))}
    </div>
  );
};
export default MyBookings;
