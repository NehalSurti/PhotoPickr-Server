import prisma from "../config/database.js";
import { photoPickrSchema } from "../validations/photoPickrValidation.js";
import { formatError, imageValidator, removeImage, uploadImage } from "../utils/helper.js";
import { ZodError } from "zod";
export const handleFindUserPhotos = async (req, res) => {
    try {
        const photoPickrs = await prisma.photoPickr.findMany({
            where: { user_id: req.user?.id },
        });
        return res.json({ message: "Data Fetched", data: photoPickrs });
    }
    catch (error) {
        // logger.error({ type: "PhotoPickr Post Error", body: error });
        res
            .status(500)
            .json({ error: "Something went wrong.please try again!", data: error });
    }
};
export const handleFindPhotoPickr = async (req, res) => {
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
    }
    catch (error) {
        // logger.error({ type: "PhotoPickr get Error", body: error });
        res
            .status(500)
            .json({ error: "Something went wrong.please try again!", data: error });
    }
};
export const handlePhotoPickrUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = photoPickrSchema.parse(body);
        if (req.files?.image) {
            const image = req.files.image;
            const validMsg = imageValidator(image?.size, image?.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            // * Delete Old Image
            const photoPickr = await prisma.photoPickr.findUnique({
                select: { id: true, image: true },
                where: { id: Number(id) },
            });
            if (photoPickr?.image)
                removeImage(photoPickr?.image);
            payload.image = uploadImage(image);
        }
        await prisma.photoPickr.update({
            data: payload,
            where: { id: Number(id) },
        });
        return res.json({ message: "PhotoPickr updated successfully!" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            // logger.error({ type: "PhotoPickr Post Error", body: error });
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
};
export const handleCreatePhotoPickr = async (req, res) => {
    try {
        const body = req.body;
        const payload = photoPickrSchema.parse(body);
        // * Check if file exists
        if (req.files?.image) {
            const image = req.files.image;
            const validMsg = imageValidator(image?.size, image?.mimetype);
            if (validMsg) {
                return res.status(422).json({ errors: { image: validMsg } });
            }
            payload.image = uploadImage(image);
        }
        else {
            return res
                .status(422)
                .json({ errors: { image: "Image field is required." } });
        }
        await prisma.photoPickr.create({
            data: {
                title: payload.title,
                description: payload?.description,
                image: payload?.image,
                user: {
                    connect: { id: req.user?.id },
                },
                expire_at: new Date(payload.expire_at),
            },
        });
        return res.json({ message: "PhotoPickr created successfully!" });
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = formatError(error);
            res.status(422).json({ message: "Invalid data", errors });
        }
        else {
            // logger.error({ type: "Clash Post Error", body: error });
            res
                .status(500)
                .json({ error: "Something went wrong.please try again!", data: error });
        }
    }
};
export const handleDeletePhotoPickr = async (req, res) => {
    try {
        const { id } = req.params;
        const photoPickr = await prisma.photoPickr.findUnique({
            select: { image: true, user_id: true },
            where: { id: Number(id) },
        });
        if (photoPickr.user_id !== req.user?.id) {
            return res.status(401).json({ message: "Un Authorized" });
        }
        if (photoPickr.image)
            removeImage(photoPickr.image);
        const photoPickrItems = await prisma.photoPickrItem.findMany({
            select: {
                image: true,
            },
            where: {
                PhotoPickr_id: Number(id),
            },
        });
        // * Remove PhotoPickr items images
        if (photoPickrItems.length > 0) {
            photoPickrItems.forEach((item) => {
                removeImage(item.image);
            });
        }
        await prisma.photoPickr.delete({
            where: { id: Number(id) },
        });
        return res.json({ message: "PhotoPickr Deleted successfully!" });
    }
    catch (error) {
        // logger.error({ type: "Clash Error", error });
        return res.status(500).json({ message: "Something went wrong" });
    }
};
