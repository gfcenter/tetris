import * as reducerType from '../../unit/reducerType';

const tmpLines = (state = { tmpLines: [] }, action) => {
  switch (action.type) {
    case reducerType.TMPLINES:
      window.console.log('===============', action.data);
      window.console.log('====---', state);
      return { tmpLines: [...state.tmpLines, action.data] };
    // return state.push(action.data);
    default:
      return state;
  }
};

export default tmpLines;
