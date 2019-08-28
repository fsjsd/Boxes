export const boxSpecFactory = ({
  id = "",
  left = 0,
  top = 0,
  scale = 1,
  zOrder = 1,
  boxColor = "red"
} = {}) => ({
  id,
  left,
  top,
  scale,
  zOrder,
  boxColor
});
