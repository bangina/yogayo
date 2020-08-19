import React from "react";
import { useSelector } from "react-redux";
import ClassCard from "./ClassCard";
import BookingTabs from "./BookingTabs";

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
