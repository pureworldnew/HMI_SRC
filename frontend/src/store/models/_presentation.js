// import authApi from '../../api/auth';
// import { toast } from 'react-toastify';

export const presentation = {
	state: {
		slectSlide: false,
		slides: [],
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
		async addSlides(formData) {
			try {
				//		const data = await authApi.post('register', false, formData);
				const data = {}
				if (data.errors) {
					return this.updateError(data.errors);
				}
				this.updateState(data, 'add_new_user')
			} catch (e) {
				this.updateError(e);
			}
		},

	})
};
