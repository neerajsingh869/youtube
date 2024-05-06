import request from "../../../api";

// action contants
export const HOME_VIDEOS_SUCCESS = "HOME_VIDEO_SUCCESS";
export const HOME_VIDEOS_FAIL = "HOME_VIDEOS_FAIL";
export const HOME_VIDEOS_REQUEST = "HOME_VIDEOS_REQUEST";

// action creators
export const getPopularVideos = () => async dispatch => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST
    });

    const result = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: "",
      }
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken
      }
    })

    console.log(result);
  } catch (error) {
    console.log(error);

    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message
    })
  }
}