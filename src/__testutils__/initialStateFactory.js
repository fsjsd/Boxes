export const initialStateFactory = ({
  past = [],
  present = [],
  future = []
} = {}) => ({
  boxes: {
    past,
    present,
    future
  }
});
