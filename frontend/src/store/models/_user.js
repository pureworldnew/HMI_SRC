// import authApi from '../../api/auth';
// import { toast } from 'react-toastify';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

export const user = {
	state: {
		allUsers: [],
		add_new_user: false,
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
		// This work
		async getAllUsers() {
			try {
				console.log('Getting all users...');
				const data = await UserService.getAllUsers();
				this.updateState(data.data, 'allUsers')
			} catch(e) {
				this.updateError(e);
			}
		},
		//
		async onSignup(formData) {
			try {
				const data = await AuthService.createAccount(formData);
				if (data.errors) {
					alert(data.errors);
					return false
				}
				//
				// must complete
				//
			} catch(e) {
				this.updateError(e);
			}
		},

		// To do
		async addNewUser(formData) {
			try {
				const data = await UserService.getAllUsers();
			} catch(e) {
				this.updateError(e)
			}
		},
		async postLogin(formData) {
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
