import { createStore } from "vuex";
import * as actions from "./action";
import VuexPersistence from "vuex-persist";
// import config from "../configs.js";
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
        myPlatformId: state.myPlatformId
    })
});

const initialState = () => {
    return {
        config: {}
    };
};

export default createStore({
    state: initialState,
    mutations: {
        updBeep(state, data) {
            state.beep = data;
        }
    },
    actions,
    plugins: [vuexLocal.plugin],
    modules: {}
});
