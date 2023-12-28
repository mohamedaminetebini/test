"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
const USERS = [
    {
        "username": "amine",
        "password": "tebini"
    },
    {
        "username": "messi",
        "password": "leo"
    }
];
app.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const filtred = USERS.filter(user => user.username === username);
    if (filtred.length > 0) {
        res.status(409).send({ message: "username is already taken" });
    }
    else if (password.length < 6) {
        res.status(400).send({ message: "password must be at least 6 characters" });
    }
    else {
        USERS.push({ username, password });
        res.status(201).send({ message: "successful registration" });
    }
}));
app.post("/sign-in", (req, res) => {
    const { username, password } = req.body;
    const filtred = USERS.filter(user => user.username === username);
    if (filtred.length === 0) {
        res.status(404).send({ message: "user does not exist" });
    }
    else if (filtred[0].password !== password) {
        res.status(401).send({ message: " incorrect credentials" });
    }
    else {
        res.status(200).send({ message: "successful authentication" });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
