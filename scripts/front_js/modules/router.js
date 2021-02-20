export default class Router {

  getHash() {
    return window.location.hash.split('#')[1];
  }

  changeURL(url) {
    history.pushState({}, null, `#${url}`);
  }

  replace(hash) {
    history.replaceState({}, null, `#${hash}`);
  }

  goBack() {
    history.back();
  }

  getShit(midURL) {
    return (endURL = '') => ({
      'found': {viewName: endURL ? 'petInfoPage' : 'mainPage', endpointName: endURL ? `case/found/${endURL}` : 'found'},
      'lost': {viewName: endURL ? 'petInfoPage' : 'mainPage', endpointName: endURL ? `case/lost/${endURL}` : 'lost'},
      'lostForm': {viewName: 'lostForm', endpointName: ''},
      'foundForm': {viewName: 'foundForm', endpointName: ''}
    })[midURL] || {viewName: 'mainPage', endpointName: 'found'};
  }

  getState() {
    if (!this.getHash()) return {viewName: 'mainPage', endpointName: 'found'};
    if (this.getHash().includes('/')) {
      const list = this.getHash().split('/');
      return this.getShit(list[0])(list[1]);
    }
    return this.getShit(this.getHash())();
  }
}
