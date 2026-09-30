
import {
    registerUser,
    loginUser
} from "../services/authService.js";

export const registerUserController = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const user = await registerUser(
            name,
            email,
            password
        );

        return res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        next(error);
    }
};

export const loginUserController = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        const result = await loginUser(
            email,
            password
        );

        return res.status(200).json({
            message: "User logged in successfully",
            user: result.user,
            token: result.token
        });

    } catch (error) {
        next(error);
    }
};





