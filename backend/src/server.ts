// yarn tsc
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import path from 'path'


// mongodb+srv://aircnc_admin:<password>@aircnc-up4sy.mongodb.net/<dbname>?retryWrites=true&w=majority

// put the password and the db name
mongoose.connect('mongodb+srv://aircnc_admin:aircnc_pass@aircnc-up4sy.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//import routes from './routes';
import cors from 'cors';

const app = express();

// especificar quem tem acesso à api
// app.use(cors({ origin: 'http://localhost:3333'}))
app.use(cors());
app.use(express.json());
// path - files 
app.use('/files', express.static(path.resolve(__dirname, "..", 'uploads')));
app.use(routes);


app.listen(5000);