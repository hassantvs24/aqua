import {CLOSE_MODAL, OPEN_MODAL} from "./actions";

const modalState = {
    open: false,
    contentPath: ''
}

export default function modalReducer(state = modalState, action) {
    const {type, payload} = action

    if (type === OPEN_MODAL) {
        return { open: true, contentPath: payload.contentPath}
    } else if (type === CLOSE_MODAL) {
        return { open: false, contentPath: state.contentPath } // keeping content path because of jumping issue
    } else {
        return state
    }
}
