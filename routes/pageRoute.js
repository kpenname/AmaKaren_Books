const router = require("express").Router();
const pageModel = require("../Model/PageModel");

router.all("/", async (req, res) => {
  console.log(req.params.key + " in pageRoute line 5");
  getPageWithDefault(req, res);
});

router.all("/:key", async (req, res) => {
  console.log(req.params.key + "in step 2");
  getPageWithDefault(req, res);
});

async function getPageWithDefault(req, res) {
  console.log(req.params.key + " in pageRoute line 15"); //it is always undefined
  if (req.params.key === undefined) {
    req.params.key = "home";
  }
  let page = await pageModel.getPage(req.params.key); // only ever sends home as the key because we set it on line 17
  let menu = await pageModel.getMenu(); // getMenu works :)

  if (page[0] !== undefined) {
    res.render("body", {
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
