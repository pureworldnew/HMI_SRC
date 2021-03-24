import PresentationService from '../../services/PresentationService';



export const presentations = {
	state: {
		archived: [],
        draft: [],
        errors: ''
	},
	reducers: {
		updateState(state, payload, name) {
			return { ...state, [name]: payload };
		},
		updateError(state, payload) {
			return { ...state, errors: payload };
		}
	},
	effects: (dispatch) => ({
        async getPresentations() {
          //   let presentations = await PresentationService.getPresentations();
          //  this.updateState(presentations, 'archived');
        }
	})
};
