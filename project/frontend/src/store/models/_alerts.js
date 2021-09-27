import { getInsightBackendAPI } from '../../utils/Http';
const token = window.localStorage.getItem('access_token');
const api = getInsightBackendAPI();

export const alerts = {
  state: {
    data: null,
    alertsActive: [],
    alertsPaused: [],
    alertCreate: {},
    errors: ''
  },
  reducers: {
    updateAlerts(state, payload) {
      const alertsActive = payload.filter((key) => key.status);
      const alertsPaused = payload.filter((key) => !key.status);
      return { ...state, data: payload, alertsActive, alertsPaused };
    },
    updateState(state, payload, name) {
      return { ...state, [name]: payload };
    },
    updateError(state, payload) {
      return { ...state, errors: payload };
    }
  },
  effects: (dispatch) => ({
    // This work
    async getAllAlerts() {
      try {
        console.log('getAllAlerts dispatch happened');
        const data = await fetch(`${api}/alerts`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        }).then((res) => res.json());

        this.updateAlerts(data.data);
        this.updateState(data.data, 'data');
      } catch (e) {
        this.updateError(e);
      }
    },
    async createAlert(formData) {
      try {
        const data = await fetch(`${api}/alerts`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }).then((res) => res.json());

        this.updateState(data.data, 'createAlert');
      } catch (e) {
        this.updateError(e);
      }
    },
    async deleteAlertById(formData) {
      try {
        await fetch(`${api}/alerts/${formData}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then((res) => res.json());
      } catch (e) {
        this.updateError(e);
      }
    },
    async editAlertById(formData) {
      // const bodyData = { status: formData.status };
      // try {
      //   const data = await fetch(`${api}/alerts/${formData.id}`, {
      //     method: 'PATCH',
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(bodyData)
      //   }).then((res) => res.json());
      // } catch (e) {
      //   this.updateError(e);
      // }
    }
  })
};
