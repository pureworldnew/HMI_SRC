export const dashboard_header = {
	state: {
		set_connection_company: null,
		set_revenue_contract_company: null,
		set_revenue_waterfall_company: null,
		set_insight_arr_segment: null,
		errors: ''
	},
	reducers: {
		updateConnectionState(state, payload) {
			return {
				...state,
				set_connection_company: payload
			};
		},
		updateContractState(state, payload) {
			return {
				...state,
				set_revenue_contract_company: payload
			};
		},
		updateWaterfallState(state, payload) {
			return {
				...state,
				set_revenue_waterfall_company: payload
			};
		},
		updateInsightArrSegmentState(state, payload) {
			return {
				...state,
				set_insight_arr_segment: payload
			};
		},
		updateError(state, payload) {
			return { ...state, errors: payload };
		}
	},
	effects: (dispatch) => ({
		async addSlides(formData) {
			try {
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