const scroll3DReducer = (state = { scroll3D: 0 }, action) => {
  if (action.type === "SCROLL3D") {
    return { scroll3D: action.payload };
  }
  return state;
};

export default scroll3DReducer;
