const Page = require("../models/Page");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
class pageController {
  getPage(req, res) {
    res.send(Page.getData());
  }

  editInfo(req, res) {
    Page.editInfoData(req.body);
    console.log(req.body);
    res.send(Page.getData());
  }

  deleteServiceByIndex(req, res) {
    Page.deleteService(req.params.index);

    res.send(Page.getData());
  }
  deleteProjectByIndex(req, res) {
    Page.deleteProject(req.params.index);
    res.send(Page.getData());
  }

  addService(req, res) {
    const image = req.files.image;
    const filename = uuidv4() + ".jpg";
    image.mv(
      path.resolve(__dirname, "../public/assets/image/service", filename),
      function (err) {
        res.send(err);
      }
    );
    req.body.fileName = filename;
    Page.addService(req.body);
    res.send(Page.getData());
  }

  addProject(req, res) {
    const image = req.files.image;
    const filename = uuidv4() + ".jpg";
    image.mv(
      path.resolve(__dirname, "../public/assets/image/project", filename),
      function (err) {
        res.send(err);
      }
    );
    req.body.fileName = filename;
    Page.addProject(req.body);
    res.send(Page.getData());
  }
}

module.exports = new pageController();
