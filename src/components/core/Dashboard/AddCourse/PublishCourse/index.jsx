// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
// import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
// import { COURSE_STATUS } from "../../../../../utils/constants"
// import IconBtn from "../../../../Common/IconBtn"

// export default function PublishCourse() {
//   const { register, handleSubmit, setValue, getValues } = useForm()

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { token } = useSelector((state) => state.auth)
//   const { course } = useSelector((state) => state.course)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     if (course?.status === COURSE_STATUS.PUBLISHED) {
//       setValue("public", true)
//     }
//   }, [])

//   const goBack = () => {
//     dispatch(setStep(2))
//   }

//   const goToCourses = () => {
//     dispatch(resetCourseState())
//     navigate("/dashboard/my-courses")
//   }

//   const handleCoursePublish = async () => {
//     // check if form has been updated or not
//     if (
//       (course?.status === COURSE_STATUS.PUBLISHED &&
//         getValues("public") === true) ||
//       (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
//     ) {
//       // form has not been updated
//       // no need to make api call
//       goToCourses()
//       return
//     }
//     // const formData = new FormData()
//     const courseStatus = getValues("public")
//       ? COURSE_STATUS.PUBLISHED
//       : COURSE_STATUS.DRAFT ;

//     const formData = {
//       courseId:course._id ,
      
//       status:courseStatus

//     }
//    // console.log("course id", course._id);
//   //  formData.append("courseId", course._id)
    
//     //formData.append("status", courseStatus)
//    // console.log("course status", courseStatus);
//     setLoading(true)
//     console.log("this is from data" ,formData)
//     const result = await editCourseDetails(formData, token)
//     if (result) {
//       goToCourses()
//     }
//     setLoading(false)
//   }

//   const onSubmit = (data) => {
//     console.log("this is onclick data",data)
//     handleCoursePublish()
//   }

//   return (
//     <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
//       <p className="text-2xl font-semibold text-richblack-5">
//         Publish Settings
//       </p>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Checkbox */}
//         <div className="my-6 mb-8">
//           <label htmlFor="public" className="inline-flex items-center text-lg">
//             <input
//               type="checkbox"
//               id="public"
//               {...register("public")}
//               className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
//             />
//             <span className="ml-2 text-richblack-400">
//               Make this course as public
//             </span>
//           </label>
//         </div>

//         {/* Next Prev Button */}
//         <div className="ml-auto flex max-w-max items-center gap-x-4">
//           <button
//             disabled={loading}
//             type="button"
//             onClick={goBack}
//             className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
//           >
//             Back
//           </button>
//           <IconBtn disabled={loading}  text="Save Changes" type="submit" />
//         </div>
//       </form>
//     </div>
//   )
// }

import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
	setCourse,
	setEditCourse,
	setStep,
} from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {
	addCourseToCategory,
	editCourseDetails,
} from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm();
	const { token } = useSelector((state) => state.auth);
	const { course } = useSelector((state) => state.course);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (course?.status === COURSE_STATUS.PUBLISHED) {
			setValue("public", true);
		}
	}, []);

	const goBack = () => {
		dispatch(setStep(2));
	};

	const goToMyCourses = () => {
		navigate("/dashboard/my-courses");
	};

	const handlePublish = async () => {
		if (
			(course?.status === COURSE_STATUS.PUBLISHED &&
				getValues("public") === true) ||
			(course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
		) {
			// no change in course status 
			// no need to do a api call
			goToMyCourses();
			setLoading(false);
			dispatch(setStep(1));
			dispatch(setEditCourse(null));
			return;
		}

		// const formData = new FormData();
		// formData.append("courseId", course._id);
		// formData.append(
		// 	"status",
		// 	getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
		// );

		const formData = {
			courseId: course._id,
			status: getValues("public")
				? COURSE_STATUS.PUBLISHED
				: COURSE_STATUS.DRAFT,
		};
		// console.log("publish data", formData);

		const result = await editCourseDetails(formData, token);
		const category_id = await course.category;

		// console.log("category_id", category_id);
		// console.log("course_id", course._id);
		
		const addCourseCategory = await addCourseToCategory(
			{ categoryId: category_id, courseId: course._id },
			token
		);

    console.log("addCourseCategory: ",addCourseCategory);

		if (result && addCourseCategory) {
			goToMyCourses();
		} else {
			toast.error("Something went wrong");
		}
		if (addCourseCategory) {
			dispatch(setStep(1));
			dispatch(setEditCourse(null));
			setLoading(false);
		}
	};

	const onSubmit = (data) => {
		setLoading(true);
		handlePublish(data);
	};

	return (
		<div>
			<div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
				<p className="text-2xl font-semibold text-richblack-5">
					Publish Settings
				</p>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="my-6 mb-8">
						<label
							htmlFor="public"
							className="inline-flex items-center text-lg"
						>
							<input
								defaultChecked={false}
								type="checkbox"
								id="public"
								name="public"
								className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
								{...register("public")}
							/>
							<span className="ml-2 text-richblack-400">
								Make this course as public
							</span>
						</label>
					</div>
					<div className="ml-auto flex max-w-max items-center gap-x-4">
						<button
							disabled={loading}
							onClick={goBack}
							type="button"
							className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
						>
							Back
						</button>
						<button
							disabled={loading}
							type="submit"
							className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PublishCourse;