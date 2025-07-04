import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        setError(null);
        console.log("Submit data:", data);

        try {
            if (post) {
                
                let fileId = post.featuredImage;
                
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        
                        if (post.featuredImage) {
                            try {
                                await appwriteService.deleteFile(post.featuredImage);
                            } catch (deleteError) {
                                console.warn("Failed to delete old image:", deleteError);
                            }
                        }
                        fileId = file.$id;
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: fileId || undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                
                if (!data.image || !data.image[0]) {
                    throw new Error("Image is required for new posts");
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file) {
                    throw new Error("Failed to upload image");
                }

                const dbPost = await appwriteService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            setError(error.message || "Failed to save post");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-900 text-gray-100 p-4 rounded-lg">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-gray-800 text-white border-gray-700"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-gray-800 text-white border-gray-700"
                    {...register("slug", { required: "Slug is required" })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {errors.slug && <p className="text-red-400 text-sm">{errors.slug.message}</p>}

                <RTE 
                    label="Content :" 
                    name="content" 
                    control={control} 
                    defaultValue={getValues("content")} 
                    className="bg-gray-800"
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 bg-gray-800 border-gray-700"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { 
                        required: !post ? "Image is required" : false 
                    })}
                />
                {errors.image && <p className="text-red-400 text-sm">{errors.image.message}</p>}

                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg max-w-full h-auto border border-gray-700"
                            onError={(e) => {
                                console.error("Error loading image preview");
                                e.target.onerror = null;
                                e.target.src = "/placeholder-image.jpg";
                            }}
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-gray-800 text-white border-gray-700"
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && <p className="text-red-400 text-sm">{errors.status.message}</p>}

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} 
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Processing..." : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form>
    );
}