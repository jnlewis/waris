class StorageService {

  setLoggedInKey(key) {
    localStorage.setItem("loggedInKey", key);
  }

  getLoggedInKey() {
    return localStorage.getItem("loggedInKey");
  }
  
  clearLoggedInKey() {
    localStorage.removeItem("loggedInKey");
  }
  
  getClaimables() {
    let currentClaimables = localStorage.getItem('claimables');
    return currentClaimables ? JSON.parse(currentClaimables) : [];
  }

  addClaimable(claimable) {
    let currentClaimables = localStorage.getItem('claimables');
    currentClaimables = currentClaimables ? JSON.parse(currentClaimables) : [];

    currentClaimables.push(claimable);
  
    localStorage.setItem('claimables', JSON.stringify(currentClaimables));
  }
  
  removeClaimable(claim) {

    let currentClaimables = localStorage.getItem('claimables');
    if (currentClaimables) {
      currentClaimables = JSON.parse(currentClaimables);

      currentClaimables.splice(currentClaimables.findIndex(v => v.balanceId === claim.balanceId), 1);

      localStorage.setItem('claimables', JSON.stringify(currentClaimables));
    }
  }
}

export default new StorageService();