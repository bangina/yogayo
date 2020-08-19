import React from "react";
import { useSelector } from "react-redux";
import ClassCard from "./ClassCard";
import BookingTabs from "./BookingTabs";

const MyBookings = () => {
  const globalKlassReducer = useSelector((state) => state.klassReducer);
  const enrolledKlasses = globalKlassReducer.enrolledKlasses;
  console.log(enrolledKlasses);
  return (
    <div>
      <BookingTabs />
      {enrolledKlasses.map((enrolledKlass)=>(
          <ClassCard key={enrolledKlass.id} klass={enrolledKlass} />
      ))}
    </div>
  );
};
export default MyBookings;
