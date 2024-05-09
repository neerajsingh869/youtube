import request from "../../../api";

// action contants
export const HOME_VIDEOS_SUCCESS = "HOME_VIDEO_SUCCESS";
export const HOME_VIDEOS_FAIL = "HOME_VIDEOS_FAIL";
export const HOME_VIDEOS_REQUEST = "HOME_VIDEOS_REQUEST";
export const SELECTED_VIDEO_REQUEST = "SELECTED_VIDEO_REQUEST";
export const SELECTED_VIDEO_SUCCESS = "SELECTED_VIDEO_SUCCESS";
export const SELECTED_VIDEO_FAIL = "SELECTED_VIDEO_FAIL";

// action creators
export const getPopularVideos = () => async (dispatch, getState) => {
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
        pageToken: getState().homeVideos.nextPageToken,
      }
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken,
        category: "All"
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

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST
    });
    
    const result = await request("/search", {
      params: {
        part: "snippet",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video"
      }
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken,
        category: keyword
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

export const getVideoById = (id) => async dispatch => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST
    });

    const response = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id
      }
    });

    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: response.data.items[0]
    })
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message
    })
  }
}