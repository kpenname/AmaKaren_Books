const router = require("express").Router();
const pageModel = require("../Model/PageModel");
const bookModel = require("../Model/BookModel");
const reviewModel = require("../Model/BookReviewModel");
const messageModel = require("../Model/MessageModel");

/* pageRoute is called each time a page is requested
The default page is set to home, but otherwise it is directed
to the page indicated after the /
If that page does not exist, we get a 404 page
 */

router.all("/", async (req, res) => {
  getPageOrDefault(req, res);
});

router.all("/:key", async (req, res) => {
  getPageOrDefault(req, res);
});

async function getPageOrDefault(req, res) {
  if (req.params.key === undefined) {
    req.params.key = "home";
  }
  let page = await pageModel.getPage(req.params.key);
  let menu = await pageModel.getMenu();
  let data = {
    page: page[0],
    menu: menu,
    user: req.user,
  };

  /* the following if statements are a way of getting data from the database
  that is necessary only on individual pages.  The available page
  is the only page that needs a list of the user's available books.

  data is defined as an array with page, menu, and user in each page is loaded
  so that info is always available.  We add wishlist to data on the wishlist page.
  */
  if (req.params.key === "available" && req.user.auth) {
    let books = await bookModel.getBooks(req.user.user.userId);
    data.books = books;
  }

  if (req.params.key === "wishlist" && req.user.auth) {
    let wishlist = await bookModel.getWishlist(req.user.user.userId);
    data.wishlist = wishlist;
  }

  if (req.params.key === "review" && req.user.auth) {
    let review = await reviewModel.getReviews(req.user.user.userId);
    data.review = review;
  }

  if (req.params.key === "message" && req.user.auth) {
    let message = await messageModel.getMessages(req.user.user.userId);
    data.message = message;
  }

  if (page[0] !== undefined) {
    res.render(req.params.key, data);
  } else {
    res.status(404);
    res.render("status404", { code: 404, status: "Not Found" });
  }
}

module.exports = router;
