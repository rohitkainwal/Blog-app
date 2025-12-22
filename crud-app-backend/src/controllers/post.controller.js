import postModel from "../models/post.model.js";
import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.util.js";
import ApiResponse from "../utils/ApiResponse.util.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.util.js";
import { getURL } from "../utils/getURL.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  console.log("request body", req.body);
  console.log("request file ", req.file);
  const buffer = req.file.buffer;

  if (!req.file) {
    return next(new CustomError(400, "Image is required"));
  }
  const imageURL = getURL(buffer, req.file.mimetype);

  const uploaded = await uploadImage(imageURL);

  if (!title || !content) {
    return next(new CustomError(400, "title and content required"));
  }
  const newPost = new postModel({
    title,
    content,
    image: {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    },
    author: req.user._id,
  });

  await newPost.save();
  new ApiResponse(200, "post created successfully", newPost).send(res);
});

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await postModel.find().populate("author", "username email");

  if (posts.length === 0) {
    return next(new CustomError(400, "no blogs found"));
  }

  new ApiResponse(200, "all blogs fetched", posts).send(res);
});

export const getPost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const post = await postModel
    .findById(postId)
    .populate("author", "username email");

  if (!post) {
    return next(new CustomError(400, "no post found"));
  }
  new ApiResponse(200, "post fetched", post).send(res);
});

//  edit blog

export const editPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const postId = req.params.id;

  // 1️⃣ Find the existing post by ID and author
  const existingPost = await postModel.findOne({
    _id: postId,
    author: req.user._id,
  });
  if (!existingPost) return next(new CustomError(404, "Post not found"));

  // Update text fields if provided
  if (title) existingPost.title = title;
  if (content) existingPost.content = content;

  // Handle image update if new file uploaded
  if (req.file) {
    const bufferValue = req.file.buffer;
    const imageURL = getURL(bufferValue, req.file.mimetype);

    // Delete old image from Cloudinary
    if (existingPost.image?.public_id) {
      const resp = await deleteImage(existingPost.image.public_id);
      if (resp.result !== "ok")
        return next(new CustomError(500, "Failed to delete old image"));
    }

    // Upload new image
    const uploadedResp = await uploadImage(imageURL);
    existingPost.image = {
      url: uploadedResp.secure_url,
      public_id: uploadedResp.public_id,
    };
  }

  //  Save the updated post
  await existingPost.save();

  new ApiResponse(200, "post updated successfully", existingPost).send(res);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findByIdAndDelete(req.params.id);
  console.log(req.params.id);
  if (!post) {
    return next(new CustomError(400, "no post found"));
  }

  new ApiResponse(200, "post delete successfully", post).send(res);
});
