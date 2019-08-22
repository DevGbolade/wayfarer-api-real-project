import express from 'express';
import morgan from 'morgan';
// import cors from 'cors';
import userRoute from  './api/routes/userRoute';
// import tripRoute from  './api/routes/tripRoute';



const app = express();
const API_VERSION = '/api/v1';
app.use(morgan('dev'));

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(`${API_VERSION}`, userRoute);
app.use(`${API_VERSION}`, tripRoute);



app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: "whoops!,this route is unavailable!",
  });
});



  export default app;