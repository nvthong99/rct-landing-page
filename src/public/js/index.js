const URL_BASE = "http://localhost:3000";

$(document).ready(async () => {
  try {
    const data = await getData();
    const CompanyName = document.getElementById("company-name");
    const Description = document.getElementById("description");
    const Introduce = document.getElementById("introduce");
    const Service = document.getElementById("services");
    const Project = document.getElementById("project");
    const Dialog = document.getElementById("dialog");
    // const CompanyName = document.getElementById("company-name");

    CompanyName.innerHTML = data.companyName;
    Description.innerHTML = data.description;
    Introduce.innerHTML = data.introduce;
    Service.innerHTML = data.services
      .map(
        (item, index) => `
          <div class="card col-lg-4" style="border: none">
            <img
            src="assets/image/service/${item.fileName || "1.jpg"}"
            class="card-img-top"
            alt="..."
            />
            <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text limit-text">
              ${item.text}
            </p>
            <button index="${index}" class="btn btn-primary popup">xem thêm</button>
          </div>
        </div>
      `
      )
      .join("\n");

    Project.innerHTML = data.projects
      .map(
        (item, index) =>
          `
        <div class="row no-gutters">
          <div
            class="col-lg-6 order-lg-${
              index % 2 == 0 ? 2 : 1
            } text-white showcase-img"
            style="background-image: url('assets/image/project/${
              item.fileName
            }')"
          ></div>
          <div class="col-lg-6 order-lg-${
            index % 2 == 0 ? 1 : 2
          } my-auto showcase-text">
            <h2>${item.name}</h2>
            <p class="lead mb-0">${item.text}</p>
          </div>
        </div>
    `
      )
      .join("\n");
    const showDialog = (title, text, filename) => {
      $("#dialog #title").html(title);
      $("#dialog #text").html(text);
      $("#service-bg").attr(
        "style",
        `background-image: url('assets/image/service/${filename}')`
      );
      Dialog.classList.remove("hide");
    };

    const hideDialog = () => {
      $("#dialog").addClass("hide");
    };

    $(".popup").click(function () {
      const index = $(this).attr("index");
      let service = data.services[index];
      showDialog(service.name, service.text, service.fileName);
    });

    $(".modal_overlay").click(() => hideDialog());
    $(".modal_btn-close").click(() => {
      hideDialog();
    });
  } catch (error) {
    throw error;
  }
});

const getData = async () => {
  const option = {
    method: "GET",
  };
  const url = `${URL_BASE}/page`;
  const res = await fetch(url, option);
  return res.json();
};
