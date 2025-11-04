import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { verifyAuthorization } from "../middlewares/verify-authorization";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";

import multer from "multer";
import uploadConfig from "../configs/upload";

const uploadRoutes = Router();
const uploadController = new UploadController();

const upload = multer(uploadConfig.MULTER);

uploadRoutes.use(ensureAuthenticated);
uploadRoutes.use(verifyAuthorization(["CLIENT", "TECHNICIAN"]));

uploadRoutes.post("/", upload.single("file"), uploadController.create);

export { uploadRoutes };
