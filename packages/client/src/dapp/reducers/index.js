import * as Action from '../actions';

export const samplePanel = (state={}, action) => {
    switch (action.type){
        case Action.SAMPLE_ACTION:
            return { ...state };

        default:
            return state
    }
}

