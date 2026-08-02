import cloudinary from "../config/cloudinary.js";
async function uploadFile(files) {
    const uploadedFiles = [];
    for (const file of files) {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "Shop-Nepal",
                    allowed_formats: ["jpg", "png", "webp"],
                },
                (error, data) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(data);
                }
            ).end(file.buffer);
        });

        uploadedFiles.push(result.secure_url);
    }

    return uploadedFiles;
}

export default uploadFile;