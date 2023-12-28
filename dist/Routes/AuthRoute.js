"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthCon_1 = require("../controllers/AuthCon");
const router = (0, express_1.Router)();
router.get("/sign-up", AuthCon_1.Signup);
exports.default = router;
