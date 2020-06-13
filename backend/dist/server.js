"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// yarn tsc
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes"));
// mongodb+srv://aircnc_admin:<password>@aircnc-up4sy.mongodb.net/<dbname>?retryWrites=true&w=majority
// put the password and the db name
mongoose_1.default.connect('mongodb+srv://aircnc_admin:aircnc_pass@aircnc-up4sy.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//import routes from './routes';
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(5000);
