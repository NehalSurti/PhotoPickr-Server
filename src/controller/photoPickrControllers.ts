import { Response, Request } from "express";
import prisma from "../config/database.js";
import { UploadedFile } from "express-fileupload";
import { photoPickrSchema } from "../validations/photoPickrValidation.js";
import { formatError, imageValidator, removeImage, uploadImage } from "../utils/helper.js";
import { ZodError } from "zod";

export const handleFindUserPhotos = async (req: Request, res: Response) => {
    try {
        const photoPickrs = await prisma.photoPickr.findMany({
            where: { user_id: req.user?.id },
        });
        return res.json({ message: "Data Fetched", data: photoPickrs });
    } catch (error) {
        // logger.error({ type: "PhotoPickr Post Error", body: error });
        res
            .status(500)
            .json({ error: "Something went wrong.please try again!", data: error });
    }

}

export const handleFindPhotoPickr = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const photoPickr = await prisma.photoPickr.findUnique({
            where: { id: Number(id) },
            include: {
                PhotoPickrItem: {
                    select: {
                        image: true,
                        id: true,
                        count: true,
                    },
                },
                PhotoPickrComments: {
                    select: {
                        id: true,
                        comment: true,
                        created_at: true,
                    },
                    orderBy: {
                        id: "desc",
                    },
                },
            },
        });
        return res.json({ message: "Data Fetched", data: photoPickr });
    } catch (error) {
        // logger.error({ type: "PhotoPickr get Error", body: error });
        res
            .status(500)
            .json({ error: "Something went wrong.please try again!", data: error });
    }

}

export const handlePhotoPickrUpdate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = photoPickrSchema.parse(body);
        if (req.files?.image) {
            const image: UploadedFile = req.files.image as UploadedFile;
            const validMsg = imageValidator(image?.size, image?.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }

            // * Delete Old Image
            const photoPickr = await prisma.photoPickr.findUnique({
                select: { id: true, image: true },
                where: { id: Number(id) },
            });
            if (photoPickr?.image) removeImage(photoPickr?.image);
            payload.image = uploadImage(image);
        }
        await prisma.photoPickr.update({
            data: payload,
            where: { id: Number(id) },
        });
        return res.json({ message: "PhotoPickr updated successfully!" });
    } catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        } else {
            // logger.error({ type: "PhotoPickr Post Error", body: error });
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
}