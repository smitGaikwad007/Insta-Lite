const likesService = require("../services/likes.service");
const postsService = require("../services/posts.service");
const usersService = require("../services/users.service");

function validId(value) {
  if (!/^[1-9]\d*$/.test(String(value))) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

function error500(res, error) {
  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
}

async function create(req, res) {
  const { userId } = req.body ?? {};
  if (userId === undefined || userId === null) {
    return res.status(400).json({ error: "userId is required" });
  }

  const postId = validId(req.params.id);
  if (postId === null) return res.status(404).json({ error: "Post not found" });

  try {
    const post = await postsService.postExists(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const parsedUserId = Number.isSafeInteger(userId) && userId > 0
      ? userId
      : null;
    const user = parsedUserId === null
      ? null
      : await usersService.userExists(parsedUserId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const like = await likesService.createLike(parsedUserId, postId);
    return res.status(201).json(like);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Already liked" });
    }
    if (error.code === "P2003") {
      return res.status(404).json({ error: "User not found" });
    }
    return error500(res, error);
  }
}

async function remove(req, res) {
  const postId = validId(req.params.id);
  const userId = validId(req.params.userId);
  if (postId === null || userId === null) {
    return res.status(404).json({ error: "Like not found" });
  }

  try {
    await likesService.deleteLike(userId, postId);
    return res.status(204).end();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Like not found" });
    }
    return error500(res, error);
  }
}

module.exports = { create, remove };
