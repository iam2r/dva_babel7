import dva from 'dva';
import router from './router'
const app = dva();
app.router(router);
app.start('#app');
