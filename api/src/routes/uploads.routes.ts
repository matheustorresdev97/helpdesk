import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { verifyAuthorization } from "../middleware/verify-authorization";
import { ensureAuthenticated } from "../middleware/ensure-authenticated";

import multer from "multer";
import uploadConfig from "../config/upload";

const uploadRoutes = Router();
const uploadController = new UploadController();

const upload = multer(uploadConfig.MULTER);

uploadRoutes.use(ensureAuthenticated);
uploadRoutes.use(verifyAuthorization(["CLIENT", "TECHNICIAN"]));

uploadRoutes.post("/", upload.single("file"), uploadController.create);

export { uploadRoutes };
