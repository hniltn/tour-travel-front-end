import { createStore } from 'vuex';
import auth from './modules/auth';
import tours from './modules/tours';
import categories from './modules/categories';
import booking from './modules/booking';

const store = createStore({
  modules: {
    auth,
    tours,
    categories,
    booking,
  },
});

export default store;
