import { Router } from "express";
import { authController,authMiddleware } from "../../container/AuthContainer";



const router=Router()
router.post('/register',authController.userRegister)
router.post('/login',authController.userLogin)
router.post('/logout',authMiddleware.verifyToken,authController.userLogout)


export default router;