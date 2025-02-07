const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator');
const createToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.authUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) throw new Error("Wrong email or password");
        if (!await bcrypt.compare(password, user.password)) throw new Error("Wrong email or password");
        const token = createToken(user.id, user.role);
        res.status(200).json({ success: true, token })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.createUser = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ success: false, errors: result.array() });
            return;
        } else {
            const { name, email, password } = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
            await userModel.create({ name, email, password: hashedPass });
            res.status(201).json({ success: true });
        }
        res.status(500).json({ success: false });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        await userModel.findByIdAndUpdate(id, { name, email, password });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        await userModel.findByIdAndDelete(id, { name, email, password });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};