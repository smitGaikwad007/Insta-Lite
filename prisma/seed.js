require("dotenv").config();

const prisma = require("../src/db");
const { users, posts, likes } = require("./seed-data");

async function main() {
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const createdUsers = await prisma.user.createManyAndReturn({
    data: users.map(({ createdAt, ...user }) => ({
      ...user,
      createdAt: new Date(createdAt),
    })),
    select: { id: true, username: true },
  });
  const userIdByUsername = new Map(
    createdUsers.map(({ id, username }) => [username, id]),
  );

  const createdPosts = await prisma.post.createManyAndReturn({
    data: posts.map(({ author, createdAt, ...post }) => ({
      ...post,
      authorId: userIdByUsername.get(author),
      createdAt: new Date(createdAt),
    })),
    select: { id: true, imageUrl: true },
  });
  const postIdByKey = new Map(
    createdPosts.map(({ id, imageUrl }) => [imageUrl.split("/")[4], id]),
  );

  const createdLikes = await prisma.like.createManyAndReturn({
    data: likes.map(({ user, post }) => ({
      userId: userIdByUsername.get(user),
      postId: postIdByKey.get(post),
    })),
  });

  console.log(
    `🌱 Seeded ${createdUsers.length} users, ${createdPosts.length} posts and ${createdLikes.length} likes`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
