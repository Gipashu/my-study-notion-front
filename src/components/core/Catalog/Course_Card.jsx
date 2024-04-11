// import React, { useEffect, useState } from "react"
// // Icons
// import { FaRegStar, FaStar } from "react-icons/fa"
// import ReactStars from "react-rating-stars-component"
// import { Link } from "react-router-dom"

// import GetAvgRating from "../../../utils/avgRating"
// import RatingStars from "../../Common/RatingStars"

// function Course_Card({ course, Height }) {
//   // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
//   // console.log(course.ratingAndReviews)
//   console.log("course ka data" ,course);
//   const [avgReviewCount, setAvgReviewCount] = useState(0)
//   useEffect(() => {
//     const count = GetAvgRating(course.ratingAndReviews)
//     setAvgReviewCount(count)
//   }, [course])
//   // console.log("count............", avgReviewCount)

//   return (
//     <>
//       <Link to={`/courses/${course._id}`}>
//         <div className="">
//           <div className="rounded-lg">
//             <img
//               src={course?.thumbnail}
//               alt="course thumnail"
//               className={`${Height} w-full rounded-xl object-cover `}
//             />
//           </div>
//           <div className="flex flex-col gap-2 px-1 py-3">
//             <p className="text-xl text-richblack-5">{course?.courseName}</p>
//             <p className="text-sm text-richblack-50">
//               {course?.instructor?.firstName} {course?.instructor?.lastName}
//             </p>
//             <div className="flex items-center gap-2">
//               <span className="text-yellow-5">{avgReviewCount || 0}</span>
//               {/* <ReactStars
//                 count={5}
//                 value={avgReviewCount || 0}
//                 size={20}
//                 edit={false}
//                 activeColor="#ffd700"
//                 emptyIcon={<FaRegStar />}
//                 fullIcon={<FaStar />}
//               /> */}
//               <RatingStars Review_Count={avgReviewCount} />
//               <span className="text-richblack-400">
//                 {course?.ratingAndReviews?.length} Ratings
//               </span>
//             </div>
//             <p className="text-xl text-richblack-5"> Rs. {course?.price}</p>
//           </div>
//         </div>
//       </Link>
//     </>
//   )
// }

// export default Course_Card

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../Common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

const Course_Card = ({ course, Height }) => {
	const [avgReviewCount, setAvgReviewCount] = useState(0);

	useEffect(() => {
		const count = GetAvgRating(course?.ratingAndReviews);
		setAvgReviewCount(count);
	}, [course]);
//   console.log("yeh course data h" ,course._id);
	return (
		<div className=" mb-4 hover:scale-[1.03] transition-all duration-200 z-50 ">
			<Link to={`/courses/${course?._id}`}>
				<div>
					<div>
						<img
							src={course?.thumbnail}
							alt="course thumbnail"
							className={`${Height} rounded-xl object-cover`}
						/>
					</div>
					<div className="flex flex-col gap-2 px-1 py-3">
						<p className="text-sm md:text-xl text-richblack-5">
							{course?.courseName}
						</p>
						<p className="text-[12px] md:text-xl text-richblack-5">
							By {" "}
							<span className="text-yellow-50">
								{course?.instructor?.firstName} {course?.instructor?.lastName}
							</span>
						</p>
						<div className="flex gap-x-3">
							<span className="text-yellow-50">{avgReviewCount || 0}</span>
							<RatingStars Review_Count={avgReviewCount} />
							<span className=" md:block hidden md:text-xl text-richblack-5">
								{course?.ratingAndReviews?.length} Ratings
							</span>
						</div>
						<p className="text-sm md:text-xl text-richblack-5">
							Rs. {course?.price}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Course_Card;