const firebaseApp = require("../helper/firebaseApp");
const { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } = require("firebase/storage");
const storage = getStorage(firebaseApp);
const https = require('https');
const fs = require('fs');
const { promisify } = require('util');

// support adding file to other services
// suport adding notes to storage => a text file that can be modififed 
// check the FE and flutter
exports.uploadFile = async (file) => {
    try {
        const fileBuffer = fs.readFileSync(file.path);

        const imagesRef = ref(storage, `files/${file.filename}`);
        const metadata = {
            contentType: file.mimetype
        };


        await uploadBytes(imagesRef, fileBuffer, metadata);
        console.log('Uploaded a blob or file!');

        fs.unlinkSync(file.path);
        return { message: "File uploaded successfully!", file };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { message: "Error uploading file" };
    }
}

exports.downloadFile = async (file) => {
    try {
        const imagesRef = ref(storage, `files/${file.name}`);
        const url = await getDownloadURL(imagesRef);
        if (url) {
            const data = await new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    console.log('Response status code:', res.statusCode); // Log status code
                    console.log('Response headers:', res.headers); // Log headers

                    let data = [];

                    res.on('data', (chunk) => {
                        // console.log(`Received chunk of size: ${chunk.length} bytes`); // Log the size of each chunk
                        data.push(chunk);
                    });

                    res.on('end', () => {
                        const buffer = Buffer.concat(data);
                        // console.log("Downloaded data length:", buffer.length); // Debugging line
                        resolve(buffer);
                    });

                    res.on('error', (e) => {
                        console.error('Error during download:', e); // Log download error
                        reject(e);
                    });
                });
            });

            // add more propertiese to file
            // {
            //     size: "",
            //     location: "",
            //     images: ""
            // }
            return { message: "File downloaded successfully!", file: data };
        } else {
            console.error('Error getting download URL');
            return { message: "Error getting download URL" };
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return { message: "Error downloading file" };
    }
};

exports.deleteFile = async (file) => {
    try {
        const imagesRef = ref(storage, `images/${file.name}`);
        await deleteObject(imagesRef);
        console.log("Deleted File Successfully!");
        return { message: "File deleted successfully!" };
    } catch (error) {
        console.error("Failed to delete file: ", error);
        return { message: "Error deleting file" };
    }
};

exports.getUrl = async (file) => {
    try {
        const imagesRef = ref(storage, `files/${file.filename}`);
        const url = await getDownloadURL(imagesRef);
        if (url) {
            return url;
         } else {
            console.error('Error getting download URL');
            return { message: "Error getting download URL" };
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return { message: "Error downloading file" };
    }
}