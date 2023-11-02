const prisma = require('../prisma');

// This function is used to create 20 authors with 3 books each. It then creates
// an array of books for each author.
const seed = async (numAuthors = 20, booksPerAuthor = 3) => {
  for (let i = 0; i < numAuthors; i++) {
    const books = [];
    for(let j = 0; j < numAuthors; j++) {
      books.push({title: `Book ${i}${j}` });
    }
    await prisma.author.create({
      data: {
        name: `Author ${i}`,
        books: {
          create: books,
        },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });