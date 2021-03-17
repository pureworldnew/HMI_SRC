export const revenue_insight = {
    state: {
        show_ARR_Segment: false,
        errors: ''
    },
    reducers: {
        updateARRSegmentState(state, payload) {
            return { ...state, show_ARR_Segment: payload };
        },
    },
    effects: (dispatch) => ({

    })
};