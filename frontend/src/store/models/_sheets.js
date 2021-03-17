// import authApi from '../../api/auth';
// import { toast } from 'react-toastify';

export const sheets = {
	state: {
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

	})
};
