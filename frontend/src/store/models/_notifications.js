// import { toast } from 'react-toastify';
import { getInsightBackendAPI } from '../../utils/Http';
const api = getInsightBackendAPI();

export const notifications = {
  state: {
    data: null,
    notificationData: null,
    alertsActive: [],
    alertsPaused: [],
    alertCreate: {},
    errors: ''
  },
  reducers: {
    updateNotifications(state, payload) {
      return { ...state, notificationData: payload };
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
    async getAllNotifications() {
      try {
        const token = window.localStorage.getItem('access_token');

        const data = await fetch(
          `${api}/main/notifications/notificationList/`,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
          }
        ).then((res) => res.json());

        this.updateNotifications(data.data);
        this.updateState(data.data, 'notificationData');
      } catch (e) {
        this.updateError(e);
      }
    },
    async createNotification(formData) {
      try {
        const token = window.localStorage.getItem('access_token');

        const data = await fetch(
          `${api}/main/notifications/notificationList/`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        ).then((res) => res.json());

        this.updateState(data.data, 'createNotification');
      } catch (e) {
        this.updateError(e);
      }
    },
    async deleteAlertById(formData) {
      const token = window.localStorage.getItem('access_token');
      try {
        await fetch(`${api}/notifications/${formData}`, {
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
      const bodyData = { status: formData.status };
      const token = window.localStorage.getItem('access_token');
      try {
        const data = await fetch(`${api}/notifications/${formData.id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyData)
        }).then((res) => res.json());
      } catch (e) {
        this.updateError(e);
      }
    }
  })
};
