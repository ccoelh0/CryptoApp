import multer, { StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";
import ApiError from "../lib/apiError";
import httpStatus from "http-status";

const FOLDER = "public/files";
const FILE_KEY = "file";

class FileUploader {
  private uploadDir: string;
  private upload: multer.Multer;

  constructor(uploadDir: string = FOLDER) {
    this.uploadDir = uploadDir;
    this.ensureUploadDir();
    this.upload = multer({
      storage: this.getStorage(),
      fileFilter: this.fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    });
  }

  private ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private getStorage(): StorageEngine {
    return multer.diskStorage({
      destination: (
        _req: Request,
        _file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
      ) => {
        cb(null, this.uploadDir);
      },
      filename: (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
      ) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });
  }

  private fileFilter(
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ): void {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new ApiError(
        httpStatus.BAD_REQUEST,
        "Only jpeg, jpg, png, and pdf files are allowed!"
      )
    );
  }

  public uploadFunc(): (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void {
    return this.upload.single(FILE_KEY);
  }
}

export default FileUploader;
