const router = require("express").Router();
const pageModel = require("../Model/PageModel");

router.all("/", async (req, res) => {
  getPageWithDefault(req, res);
});

router.all("/:key", async (req, res) => {
  getPageWithDefault(req, res);
});

async function getPageWithDefault(req, res) {
  if (req.params.key === undefined) {
    req.params.key = "home";
  }
  let page = await pageModel.getPage(req.params.key);
  let menu = await pageModel.getMenu();

  console.log(req.user);
  if (page[0] !== undefined) {
    res.render(req.params.key, {
      page: page[0],
      menu: menu,
      user: req.user,
    });
  } else {
    res.status(404);
    res.render("status404", { code: 404, status: "Not Found" });
  }
}

module.exports = router;
