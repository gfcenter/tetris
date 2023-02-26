import * as reducerType from '../../unit/reducerType';

const wallet = (state = '', action) => {
  switch (action.type) {
    case reducerType.WALLET:
      return action.data;
    default:
      return state;
  }
};

export default wallet;
