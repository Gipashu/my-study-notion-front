// import React, { useEffect, useRef, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"

// import "video-react/dist/video-react.css"
// import { useLocation } from "react-router-dom"
// import { BigPlayButton, Player } from "video-react"

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
// import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
// import IconBtn from "../../Common/IconBtn"

// const VideoDetails = () => {
//   const { courseId, sectionId, subSectionId } = useParams()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const playerRef = useRef(null)
//   const dispatch = useDispatch()
//   const { token } = useSelector((state) => state.auth)
//   const { courseSectionData, courseEntireData, completedLectures } =
//     useSelector((state) => state.viewCourse)

//   const [videoData, setVideoData] = useState([])
//   const [previewSource, setPreviewSource] = useState("")
//   const [videoEnded, setVideoEnded] = useState(false)
//   const [loading, setLoading] = useState(false)
//   // console.log("course selection data" ,courseSectionData)
//   useEffect(() => {
//     ;(async () => {
//       if (!courseSectionData.length) return
//       if (!courseId && !sectionId && !subSectionId) {
//         navigate(`/dashboard/enrolled-courses`)
//       } else {
//         // console.log("courseSectionData", courseSectionData)
//         const filteredData = courseSectionData.filter(
//           (section) => section._id === sectionId
//         )
//         console.log("filteredData", filteredData)
//         const filteredVideoData = filteredData?.[0]?.subSection.filter(
//           (subsection) => subsection._id === subSectionId
//         )
//         // console.log("filteredVideoData", filteredVideoData)
//         setVideoData(filteredVideoData)
//         setPreviewSource(courseEntireData.thumbnail)
//         setVideoEnded(false)
//       }
//     })()
//   }, [courseSectionData, courseEntireData, location.pathname])

//   // check if the lecture is the first video of the course
//   const isFirstVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
//       return true
//     } else {
//       return false
//     }
//   }

//   // go to the next video
//   const goToNextVideo = () => {
//     // console.log(courseSectionData)

//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     // console.log("no of subsections", noOfSubsections)

//     if (currentSubSectionIndx !== noOfSubsections - 1) {
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx + 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
//       )
//     } else {
//       const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
//       const nextSubSectionId =
//         courseSectionData[currentSectionIndx + 1].subSection[0]._id
//       navigate(
//         `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
//       )
//     }
//   }

//   // check if the lecture is the last video of the course
//   const isLastVideo = () => {
//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const noOfSubsections =
//       courseSectionData[currentSectionIndx].subSection.length

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (
//       currentSectionIndx === courseSectionData.length - 1 &&
//       currentSubSectionIndx === noOfSubsections - 1
//     ) {
//       return true
//     } else {
//       return false
//     }
//   }

//   // go to the previous video
//   const goToPrevVideo = () => {
//     // console.log(courseSectionData)

//     const currentSectionIndx = courseSectionData.findIndex(
//       (data) => data._id === sectionId
//     )

//     const currentSubSectionIndx = courseSectionData[
//       currentSectionIndx
//     ].subSection.findIndex((data) => data._id === subSectionId)

//     if (currentSubSectionIndx !== 0) {
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx].subSection[
//           currentSubSectionIndx - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
//       )
//     } else {
//       const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
//       const prevSubSectionLength =
//         courseSectionData[currentSectionIndx - 1].subSection.length
//       const prevSubSectionId =
//         courseSectionData[currentSectionIndx - 1].subSection[
//           prevSubSectionLength - 1
//         ]._id
//       navigate(
//         `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
//       )
//     }
//   }

//   const handleLectureCompletion = async () => {
//     setLoading(true)
//     const res = await markLectureAsComplete(
//       { courseId: courseId, subsectionId: subSectionId },
//       token
//     )
//     if (res) {
//       dispatch(updateCompletedLectures(subSectionId))
//     }
//     setLoading(false)
//   }

//   return (
//     <div className="flex flex-col gap-10 items-center py-10 text-white">
//       {!videoData ? (
//         <img
//           src={previewSource}
//           alt="Preview"
//           className="h-70% w-70% rounded-md object-cover"
//         />
//       ) : (
//         <Player
//           ref={playerRef}
//           aspectRatio="16:9"
//           playsInline
//           onEnded={() => setVideoEnded(true)}
//           src={videoData?.videoUrl}
//         >
//           <BigPlayButton position="center" />
//           {/* Render When Video Ends */}
//           {videoEnded && (
//             <div
//               style={{
//                 backgroundImage:
//                   "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//               }}
//               className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//             >
//               {!completedLectures.includes(subSectionId) && (
//                 <IconBtn
//                   disabled={loading}
//                   onclick={() => handleLectureCompletion()}
//                   text={!loading ? "Mark As Completed" : "Loading..."}
//                   customClasses="text-xl max-w-max px-4 mx-auto"
//                 />
//               )}
//               <IconBtn
//                 disabled={loading}
//                 onclick={() => {
//                   if (playerRef?.current) {
//                     // set the current time of the video to 0
//                     playerRef?.current?.seek(0)
//                     setVideoEnded(false)
//                   }
//                 }}
//                 text="Rewatch"
//                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//               />
//               <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                 {!isFirstVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToPrevVideo}
//                     className="blackButton"
//                   >
//                     Prev
//                   </button>
//                 )}
//                 {!isLastVideo() && (
//                   <button
//                     disabled={loading}
//                     onClick={goToNextVideo}
//                     className="blackButton"
//                   >
//                     Next
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}
//         </Player>
//       )}

//       <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
//       <p className="pt-2 pb-6">{videoData?.description}</p>
//     </div>
//   )
// }

// export default VideoDetails
// // video

import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ControlBar, Player } from "video-react";
// import '~video-react/dist/video-react.css'; // import css
import {
	BigPlayButton,
	LoadingSpinner,
	PlaybackRateMenuButton,
	ForwardControl,
	ReplayControl,
	CurrentTimeDisplay,
	TimeDivider,
} from "video-react";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { BiSkipNextCircle } from "react-icons/bi";
import { MdOutlineReplayCircleFilled } from "react-icons/md";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { setCompletedLectures } from "../../../slices/viewCourseSlice";
import { useDispatch } from "react-redux";

const VideoDetails = () => {
	const { courseId, sectionId, subsectionId } = useParams();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	// console.log("user",user._id);
	const {
		courseSectionData,
		courseEntireData,
		completedLectures,
		totalNoOfLectures,
	} = useSelector((state) => state.viewCourse);
	// console.log("completedLectures", completedLectures);
  
	const navigate = useNavigate();
	const playerRef = React.useRef(null);

	const [videoData, setVideoData] = useState([]);
	const [videoEnd, setVideoEnd] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (courseSectionData.length === 0) {
			return;
		}
		const filteredSection = courseSectionData?.filter(
			(section) => section._id === sectionId
		);
    // console.log("yeh filteredSection" ,filteredSection);
		// const filteredSubsection = filteredSection[0]?.subSection?.filter(
    //   (subSection) => subSection._id === subsectionId
		// );
    const filteredSubsection = filteredSection[0]?.subSection[0]
    console.log("print" ,filteredSection[0]?.subSection[0]._id )
		setVideoData(filteredSubsection);
		// console.log(filteredSubsection);
		setVideoEnd(false);
	}, [courseSectionData, sectionId, subsectionId]);

	const isLastLecture = () => {
		const currentSectionIndex = courseSectionData?.findIndex(
			(section) => section._id === sectionId
		);
		const currentSubsectionIndex = courseSectionData[
			currentSectionIndex
		]?.subSection.findIndex((subsection) => subsection._id === subsectionId);
		if (
			currentSubsectionIndex ===
				courseSectionData[currentSectionIndex]?.subSection?.length - 1 &&
			currentSectionIndex === courseSectionData?.length - 1
		) {
			// console.log("last lecture");
			return true;
		} else {
			// console.log("not last lecture");
			return false;
		}
	};

	const isFirstLecture = () => {
		const currentSectionIndex = courseSectionData?.findIndex(
			(section) => section._id === sectionId
		);
		const currentSubsectionIndex = courseSectionData[
			currentSectionIndex
		]?.subSection.findIndex((subsection) => subsection._id === subsectionId);
		if (currentSubsectionIndex === 0 && currentSectionIndex === 0) {
			// console.log("first lecture");
			return true;
		} else {
			// console.log("not first lecture");
			return false;
		}
	};

	const nextLecture = () => {
		if (isLastLecture()) {
			return;
		}
		const currentSectionIndex = courseSectionData?.findIndex(
			(section) => section._id === sectionId
		);
		const currentSubsectionIndex = courseSectionData[
			currentSectionIndex
		]?.subSection.findIndex((subsection) => subsection._id === subsectionId);
		if (
			currentSubsectionIndex ===
			courseSectionData[currentSectionIndex]?.subSection.length - 1
		) {
			const nextSectionId = courseSectionData[currentSectionIndex + 1]?._id;
			const nextSubsectionId =
				courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;
			navigate(
				`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
			);
		} else {
			const nextSectionId = courseSectionData[currentSectionIndex]._id;
			const nextSubsectionId =
				courseSectionData[currentSectionIndex].subSection[
					currentSubsectionIndex + 1
				]._id;
			navigate(
				`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubsectionId}`
			);
		}
	};

	const previousLecture = () => {
		if (isFirstLecture()) {
			return;
		}
		const currentSectionIndex = courseSectionData?.findIndex(
			(section) => section._id === sectionId
		);
		const currentSubsectionIndex = courseSectionData[
			currentSectionIndex
		]?.subSection.findIndex((subsection) => subsection._id === subsectionId);
		if (currentSubsectionIndex === 0) {
			const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
			const previousSubsectionId =
				courseSectionData[currentSectionIndex - 1]?.subSection[
					courseSectionData[currentSectionIndex - 1].subSection.length - 1
				]._id;
			navigate(
				`/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`
			);
		} else {
			const previousSectionId = courseSectionData[currentSectionIndex]?._id;
			const previousSubsectionId =
				courseSectionData[currentSectionIndex]?.subSection[
					currentSubsectionIndex - 1
				]._id;
			navigate(
				`/dashboard/enrolled-courses/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubsectionId}`
			);
		}
	};

	const handleLectureCompletion = async () => {
		const res = await markLectureAsComplete(
			{
				userId: user._id,
				courseId: courseId,
				subSectionId: subsectionId,
			},
			token
		);
		dispatch(setCompletedLectures([...completedLectures, videoData._id]));
		console.log("lecture completed", completedLectures);
	};

	//set video end to false when .play() is called

	return (
		<div className="md:w-[calc(100vw-320px)] w-screen p-3">
			{!videoData ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<Player
						className="w-full relative"
						ref={playerRef}
						src={videoData.videoUrl}
						aspectRatio="16:9"
						fluid={true}
						autoPlay={false}
						onEnded={() => setVideoEnd(true)}
					>
						<BigPlayButton position="center" />

						<LoadingSpinner />
						<ControlBar>
							<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
							<ReplayControl seconds={5} order={7.1} />
							<ForwardControl seconds={5} order={7.2} />
							<TimeDivider order={4.2} />
							<CurrentTimeDisplay order={4.1} />
							<TimeDivider order={4.2} />
						</ControlBar>
						{videoEnd && (
							<div className="flex justify-center items-center">
								<div className="flex justify-center items-center">
									{completedLectures && !completedLectures.includes(videoData._id) && (
										<button
											onClick={() => {
												handleLectureCompletion();
											}}
											className="bg-yellow-100 text-richblack-900 absolute top-[20%] hover:scale-90 z-20 font-medium md:text-sm px-4 py-2 rounded-md"
										>
											Mark as Completed
										</button>
									)}
								</div>
								{!isFirstLecture() && (
									<div className=" z-20 left-0 top-1/2 transform -translate-y-1/2 absolute m-5">
										<BiSkipPreviousCircle
											onClick={previousLecture}
											className=" text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
										/>
										{/* <button onClick={previousLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Previous Lecture</button> */}
									</div>
								)}
								{!isLastLecture() && (
									<div className=" z-20 right-4 top-1/2 transform -translate-y-1/2 absolute m-5">
										<BiSkipNextCircle
											onClick={nextLecture}
											className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
										/>
										{/* <button onClick={nextLecture} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Next Lecture</button> */}
									</div>
								)}
								{
									<MdOutlineReplayCircleFilled
										onClick={() => {
											playerRef.current.seek(0);
											playerRef.current.play();
											setVideoEnd(false);
										}}
										className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 absolute top-1/2 z-20"
									/>
								}
							</div>
						)}
					</Player>
				</div>
			)}
			{/* video title and desc */}
			<div className="mt-5">
				<h1 className="text-2xl font-bold text-richblack-25">
					{videoData?.title}
				</h1>
				<p className="text-gray-500 text-richblack-100">
					{videoData?.description}
				</p>
			</div>
		</div>
	);
};

export default VideoDetails;