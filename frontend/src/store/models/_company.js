// import authApi from '../../api/auth';
// import { toast } from 'react-toastify';

export const company = {
	state: {
		set_create_company: false,
		errors: ''
	},
	reducers: {
		updateState(state, payload) {
			// console.log('state, pageyload: ', state, payload);
			return {
				...state,
				set_create_company: payload
			};
		},
		updateError(state, payload) {
			return { ...state, errors: payload };
		}
	},
	effects: (dispatch) => ({
		async testAPI(formData) {
			try {
				// const data = await authApi.post('register', false, formData);
				const data = {}
				if (data.errors) {
					return this.updateError(data.errors);
				}
				this.updateState(data, 'set_create_company')
			} catch (e) {
				this.updateError(e);
			}
		},
	})
};
