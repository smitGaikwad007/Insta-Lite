const prisma = require("../db");

const USER_SUMMARY = {
  id: true,
  username: true,
  fullname: true,
};

const POST_DETAILS = {
  author: { select: USER_SUMMARY },
  _count: { select: { likes: true } },
};

async function createPost(data) {
  return prisma.post.create({ data });
}

async function listPosts({ where, skip, take, orderBy }) {
  return prisma.$transaction([
    prisma.post.findMany({
      where,
      skip,
      take,
      orderBy,
      include: POST_DETAILS,
    }),
    prisma.post.count({ where }),
  ]);
}

async function getPostById(id) {
  return prisma.post.findUnique({
    where: { id },
    include: POST_DETAILS,
  });
}

async function postExists(id) {
  return prisma.post.findUnique({ where: { id }, select: { id: true } });
}

async function listPostLikes(postId) {
  return prisma.like.findMany({
    where: { postId },
    orderBy: { user: { username: "asc" } },
    select: { user: { select: USER_SUMMARY } },
  });
}

async function updatePost(id, data) {
  return prisma.post.update({ where: { id }, data });
}

async function deletePost(id) {
  return prisma.post.delete({ where: { id } });
}

module.exports = {
  createPost,
  listPosts,
  getPostById,
  postExists,
  listPostLikes,
  updatePost,
  deletePost,
};
