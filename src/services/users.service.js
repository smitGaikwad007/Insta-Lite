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

const USER_SELECT = {
  id: true,
  username: true,
  email: true,
  fullname: true,
  bio: true,
  isPrivate: true,
  createdAt: true,
  updatedAt: true,
};

async function createUser(data) {
  return prisma.user.create({ data, select: USER_SELECT });
}

async function listUsers({ where, skip, take, orderBy }) {
  return prisma.$transaction([
    prisma.user.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        _count: { select: { posts: true, likes: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);
}

async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      _count: { select: { posts: true, likes: true } },
    },
  });
}

async function userExists(id) {
  return prisma.user.findUnique({ where: { id }, select: { id: true } });
}

async function listUserPosts(id, { skip, take }) {
  const where = { authorId: id };

  return prisma.$transaction([
    prisma.post.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { likes: true } } },
    }),
    prisma.post.count({ where }),
  ]);
}

async function listLikedPosts(id, { skip, take }) {
  const where = { likes: { some: { userId: id } } };

  return prisma.$transaction([
    prisma.post.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: POST_DETAILS,
    }),
    prisma.post.count({ where }),
  ]);
}

async function updateUser(id, data) {
  return prisma.user.update({ where: { id }, data });
}

async function deleteUser(id) {
  return prisma.user.delete({ where: { id } });
}

module.exports = {
  createUser,
  listUsers,
  getUserById,
  userExists,
  listUserPosts,
  listLikedPosts,
  updateUser,
  deleteUser,
};
