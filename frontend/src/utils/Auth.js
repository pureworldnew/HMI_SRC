export const setItemsLocalStorage = (accessToken, roleId, companyId, username, contractStatus) => {
  let day = new Date();
  day.setDate(day.getDate() + 1);
  window.localStorage.setItem('exp', day);
  window.localStorage.setItem('access_token', accessToken);
  window.localStorage.setItem('username', username);
  window.localStorage.setItem('companyId', companyId);
  window.localStorage.setItem('roleId', roleId);
  window.localStorage.setItem('contractStatus', contractStatus);
}

export const deleteItemsLocalStorage = () => {
  window.localStorage.removeItem('exp');
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('username');
  window.localStorage.removeItem('companyId');
  window.localStorage.removeItem('roleId');
  window.localStorage.removeItem('contractStatus');
  // window.location.replace('/');
}

