import { createApp } from 'vue';
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router/index.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLocationDot, faClock, faPlaneDeparture, faCar, faTrain, faShip, faBus, faSailboat, faCircleCheck, faCircleUser, faAngleDown, faCalendar, faMagnifyingGlass, faStar, faBarcode, faChild, faUser, faRightFromBracket, faPlus} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import '@/router/interceptor'
import store from './store';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
library.add(faLocationDot, faClock, faPlaneDeparture, faCar, faTrain, faShip, faBus, faSailboat, faCircleCheck, faCircleUser, faAngleDown, faCalendar, faMagnifyingGlass, faStar, faFacebook, faInstagram, faPinterest, faTwitter, faBarcode, faChild, faUser, faCreditCard, faCalendarCheck, faMoneyCheckDollar, faBars, faHouse, faFileContract, faReceipt, faLayerGroup, faChartPie, faEnvelope, faKey, faAngleUp, faRightFromBracket, faPlus)
store.dispatch('auth/initializeAuth').then(() => {
    createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
  });
