import { AUTH_TOKEN } from 'constants';


export default new class {
    store = AUTH_TOKEN;
    setItem = (key,val) => (this.store[key] = val);
    getItem = key => this.store[key];
    removeItem = key => {delete this.store[key]; };
    clear = () => (this.store = {});
}();