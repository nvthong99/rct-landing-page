const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.join(__dirname, "data.json"));
const Page = {
  data: JSON.parse(data.toString()),
  getData: function () {
    return this.data;
  },
  editInfoData: function (__data) {
    this.data = {
      ...this.data,
      ...__data,
    };
    console.log("db" + this.data);
    this.save();
  },
  deleteService: function (index) {
    let remove = this.data.services.splice(index, 1);

    this.save();
  },
  addService: function (service) {
    this.data.services.push(service);
    this.save();
  },
  deleteProject: function (index) {
    let remove = this.data.projects.splice(index, 1);

    this.save();
  },
  addProject: function (project) {
    this.data.projects.push(project);
    this.save();
  },
  save: function () {
    fs.writeFileSync(
      path.join(__dirname, "data.json"),
      JSON.stringify(this.data)
    );
  },
};

module.exports = Page;
