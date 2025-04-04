import Router from './Routes/Router.js';
export default (app) => {
    //Base URL
    app.use('/api/users', Router); 
};
