import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(), 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    slug 
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error; 
        }
    }

    async updatePost(documentId, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId, 
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.error("Appwrite Service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId 
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deletePost :: error", error);
            throw error;
        }
    }

    // async getPost(documentId) {
    //     try {
    //         return await this.databases.getDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             documentId 
    //         );
    //     } catch (error) {
    //         console.error("Appwrite Service :: getPost :: error", error);
    //         throw error;
    //     }
    // }


    async getPost(documentId) {
    try {
        console.log("Trying to fetch document with ID:", documentId); // Add this
        console.log("Using database ID:", conf.appwriteDatabaseId); // Add this
        console.log("Using collection ID:", conf.appwriteCollectionId); // Add this
        
        const doc = await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            documentId 
        );
        
        console.log("Successfully fetched document:", doc); // Add this
        return doc;
    } catch (error) {
        console.error("Appwrite Service :: getPost :: error", error);
        throw error;
    }
}

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {

            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            console.log("posts", posts);
            return posts;
        } catch (error) {
            console.error("Appwrite Service :: getPosts :: error", error);
            throw error;
        }
    }


    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("Appwrite Service :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.error("Appwrite Service :: deleteFile :: error", error);
            throw error;
        }
    }

    async getFilePreview(fileId) {
        try {
            const res =  this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );

            console.log("res", res);
            return res;
        } catch (error) {
            console.error("Appwrite Service Image error:: getFilePreview :: error", error);
            throw error;
        }
    }

    async getFileDownload(fileId) {
        try {
            return this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Appwrite Service :: getFileDownload :: error", error);
            throw error;
        }
    }
}

const service = new Service();
export default service;