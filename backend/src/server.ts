// yarn tsc
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

// mongodb+srv://aircnc_admin:<password>@aircnc-up4sy.mongodb.net/<dbname>?retryWrites=true&w=majority

// put the password and the db name
mongoose.connect('mongodb+srv://aircnc_admin:aircnc_pass@aircnc-up4sy.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);


app.listen(5000);