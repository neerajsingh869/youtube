import request from "../../../api";

// action contants
export const HOME_VIDEOS_SUCCESS = "HOME_VIDEO_SUCCESS";
export const HOME_VIDEOS_FAIL = "HOME_VIDEOS_FAIL";
export const HOME_VIDEOS_REQUEST = "HOME_VIDEOS_REQUEST";
export const HOME_VIDEOS_RESET = "HOME_VIDEOS_RESET";

export const SELECTED_VIDEO_REQUEST = "SELECTED_VIDEO_REQUEST";
export const SELECTED_VIDEO_SUCCESS = "SELECTED_VIDEO_SUCCESS";
export const SELECTED_VIDEO_FAIL = "SELECTED_VIDEO_FAIL";

export const SEARCHED_VIDEOS_REQUEST = "SEARCHED_VIDEOS_REQUEST";
export const SEARCHED_VIDEOS_RESET = "SEARCHED_VIDEOS_RESET";
export const SEARCHED_VIDEOS_SUCCESS = "SEARCHED_VIDEOS_SUCCESS";
export const SEARCHED_VIDEOS_FAIL = "SEARCHED_VIDEOS_FAIL";

export const CHANNEL_VIDEOS_REQUEST = "CHANNEL_VIDEOS_REQUEST";
export const CHANNEL_VIDEOS_SUCCESS = "CHANNEL_VIDEOS_SUCCESS";
export const CHANNEL_VIDEOS_FAIL = "CHANNEL_VIDEOS_FAIL";
export const CHANNEL_VIDEOS_RESET = "CHANNEL_VIDEOS_RESET";

export const LIKED_VIDEOS_FAIL = "LIKED_VIDEOS_FAIL";
export const LIKED_VIDEOS_RESET = "LIKED_VIDEOS_RESET";
export const LIKED_VIDEOS_REQUEST = "LIKED_VIDEOS_REQUEST";
export const LIKED_VIDEOS_SUCCESS = "LIKED_VIDEOS_SUCCESS";

export const VIDEO_RATING_REQUEST = "VIDEO_RATING_REQUEST";
export const VIDEO_RATING_SUCCESS = "VIDEO_RATING_SUCCESS";
export const VIDEO_RATING_FAIL = "VIDEO_RATING_REQUEST";

// action creators
export const getPopularVideos = (mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST
    });

    let result;
    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: HOME_VIDEOS_RESET
      });

      result = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 20,
        }
      });
    } else {
      result = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
        }
      });
    }

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken,
        category: "All"
      }
    })

  } catch (error) {
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message
    })
  }
}

export const getVideosByCategory = (keyword, mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST
    });

    let result;
    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: HOME_VIDEOS_RESET
      });

      result = await request("/search", {
        params: {
          part: "snippet",
          regionCode: "IN",
          maxResults: 20,
          q: keyword,
          type: "video"
        }
      });
    } else {
      result = await request("/search", {
        params: {
          part: "snippet",
          regionCode: "IN",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
          q: keyword,
          type: "video"
        }
      });
    }

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken,
        category: keyword
      }
    })

  } catch (error) {
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
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message
    })
  }
}

export const getVideosBySearch = (keyword, mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCHED_VIDEOS_REQUEST
    });

    let result;

    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: SEARCHED_VIDEOS_RESET
      })

      result = await request("/search", {
        params: {
          part: "snippet",
          regionCode: "IN",
          maxResults: 20,
          q: keyword,
          type: "video,channel"
        }
      });
    } else {
      result = await request("/search", {
        params: {
          part: "snippet",
          regionCode: "IN",
          maxResults: 20,
          pageToken: getState().searchedVideos.nextPageToken,
          q: keyword,
          type: "video,channel"
        }
      });
    }

    dispatch({
      type: SEARCHED_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken,
        currKeyword: keyword
      }
    })

  } catch (error) {
    dispatch({
      type: SEARCHED_VIDEOS_FAIL,
      payload: error.message
    })
  }
}

export const getVideosByChannel = (id, mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST
    })

    // 1. get upload playlist id
    let result = await request('/channels', {
      params: {
        part: 'contentDetails',
        id: id
      }
    });

    const uploadPlaylistId = result.data.items[0].contentDetails.relatedPlaylists.uploads;

    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: CHANNEL_VIDEOS_RESET
      })

      // 2. get the videos by channel id
      result = await request('/playlistItems', {
        params: {
          part: 'contentDetails,snippet',
          playlistId: uploadPlaylistId,
          maxResults: 20,
        }
      })
    } else {
      // 2. get the videos by channel id
      result = await request('/playlistItems', {
        params: {
          part: 'contentDetails,snippet',
          playlistId: uploadPlaylistId,
          maxResults: 20,
          pageToken: getState().channelVideos.nextPageToken,
        }
      })
    }

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken
      }
    })
  } catch (error) {
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.message
    })
  }
}

export const getLikedVideos = (mountOrNot) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKED_VIDEOS_REQUEST
    });

    let result;
    if (mountOrNot && mountOrNot === 'onmount') {
      dispatch({
        type: LIKED_VIDEOS_RESET
      });

      result = await request('/videos', {
        params: {
          part: "snippet,contentDetails,statistics",
          maxResults: 20,
          pageToken: getState().likedVideos.nextPageToken,
          myRating: "like"
        }, 
        headers: {
          Authorization: `Bearer ${getState().auth.googleAccessToken}`
        }
      })
    } else {
      result = await request('/videos', {
        params: {
          part: "snippet,contentDetails,statistics",
          maxResults: 20,
          pageToken: getState().likedVideos.nextPageToken,
          myRating: "like"
        }, 
        headers: {
          Authorization: `Bearer ${getState().auth.googleAccessToken}`
        }
      })
    }

    dispatch({
      type: LIKED_VIDEOS_SUCCESS,
      payload: {
        videos: result.data.items,
        nextPageToken: result.data.nextPageToken
      }
    })
  } catch (error) {
    dispatch({
      type: LIKED_VIDEOS_FAIL,
      error: error.message
    })
  }
}

export const getVideoRating = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: VIDEO_RATING_REQUEST
    });

    const response = await request('/videos/getRating', {
      params: {
        id: id,
      }, 
      headers: {
        Authorization: `Bearer ${getState().auth.googleAccessToken}`
      }
    })

    dispatch({
      type: VIDEO_RATING_SUCCESS,
      payload: response.data.items[0].rating
    })

    console.log(response.data.items[0].rating);
  } catch (error) {
    dispatch({
      type: VIDEO_RATING_FAIL,
      payload: error.message
    })
  }
}