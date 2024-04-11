import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { catalogData } from "../apis"
// const {CATALOGPAGEDATA_API}=catalogData
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  // console.log("called get catalog page data")
  let result = []
  try {
    // console.log("called get catalog page data")
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      {
        categoryId: categoryId,
      }
    )
    // console.log("to get data from post request" ,response);
    
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    result = response?.data
    // console.log("response" ,result);
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}
