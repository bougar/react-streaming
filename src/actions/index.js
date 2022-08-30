import streams from "../apis/streams";
import { CREATE_STREAM, DELETE_STREAM, GET_STREAM, LIST_STREAMS, UPDATE_STREAM, SIGN_IN, SIGN_OUT } from "./types";
import history from "../history";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", {
    ...formValues,
    userId,
  });
  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });
  history.push("/");
};

export const getStream = (streamId) => async (dispatch) => {
  const response = await streams.get(`/streams/${streamId}`);
  dispatch({
    type: GET_STREAM,
    payload: response.data,
  });
};

export const deleteStream = (streamId) => async (dispatch) => {
  await streams.delete(`/streams/${streamId}`);
  dispatch({
    type: DELETE_STREAM,
    payload: streamId,
  });
  history.push("/");
};

export const listStreams = (formValues) => async (dispatch) => {
  const response = await streams.get("/streams", formValues);
  dispatch({
    type: LIST_STREAMS,
    payload: response.data,
  });
};

export const updateStream = (streamId, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${streamId}`, formValues);
  dispatch({
    type: UPDATE_STREAM,
    payload: response.data,
  });
  history.push("/");
};
