const URL_BASE = "http://localhost:3000";
$(document).ready(async () => {
  // const data = await getData();

  if (await checkLogin()) {
    $("#login-content").hide();
    $("#admin-content").show();
    showCommon();
  } else {
    $("#login-content").show();
    $("#admin-content").hide();
  }

  $("#common").click(showCommon);
  $("#service-business").click(showService);
  $("#project-business").click(showProject);
  $("#btn-login").click(login);
});

const login = async (e) => {
  e.preventDefault();
  const inputs = $("#login-content input");
  const user = {
    username: $(inputs[0]).val(),
    password: $(inputs[1]).val(),
  };
  console.log(user);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(user),
  };

  const res = await fetch(`${URL_BASE}/login`, options);
  if (res.status === 200) {
    const token = await res.text();

    localStorage.setItem("token", token);
    $("#login-content").hide();
    $("#admin-content").show();
    showCommon();
    return true;
  }
  alert("Sai username hoặc password");
  return false;
};
const loadCommon = async () => {
  const data = await getData();
  $("#common-container .input").map((index, element) => {
    $(element).val(data[$(element).attr("name")]);
  });
};

const loadServices = async () => {
  $("#table").html("");
  const data = await getData();
  data.services.map((item, index) => {
    var element = $(`<tr>
    <th scope="row">${index + 1}</th>
    
    <td>${item.name}</td>
    <td>${item.text}</td>
    <td><button onclick="deleteOnclick(${index})"  key=${index} class="btn btn-warning delete-service">xóa</button></td>
  </tr>`);
    $("#table").append(element);
  });
};

const loadProject = async () => {
  $("#table-project").html("");
  const data = await getData();
  data.projects.map((item, index) => {
    var element = $(`<tr>
    <th scope="row">${index + 1}</th>
    
    <td>${item.name}</td>
    <td>${item.text}</td>
    <td><button onclick="deleteProjectOnclick(${index})" class="btn btn-warning delete-service">xóa</button></td>
  </tr>`);
    $("#table-project").append(element);
  });
};

const checkLogin = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const option = {
    method: "Get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  const url = `${URL_BASE}/admin-check`;
  const res = await fetch(url, option);
  if (res.status == 200) return true;
  else return false;
};

async function deleteOnclick(index) {
  var check = window.confirm("bạn có chắc chắn muốn xóa không?");
  if (check) {
    const option = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const url = `${URL_BASE}/service/${index}`;
    const res = await fetch(url, option);
    loadServices();
  }
}

async function deleteProjectOnclick(index) {
  var check = window.confirm("bạn có chắc chắn muốn xóa không?");
  if (check) {
    const option = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    const url = `${URL_BASE}/project/${index}`;
    const res = await fetch(url, option);

    loadProject();
  }
}

const showCommon = () => {
  $("#common-container").show();
  $("#service-container").hide();
  $("#project-container").hide();
  $("#common").addClass("active");
  $("#service-business").removeClass("active");
  $("#project-business").removeClass("active");
  loadCommon();
};

const showService = () => {
  $("#common-container").hide();
  $("#service-container").show();
  $("#project-container").hide();
  $("#common").removeClass("active");
  $("#service-business").addClass("active");
  $("#project-business").removeClass("active");

  loadServices();
};

const showProject = () => {
  $("#common-container").hide();
  $("#service-container").hide();
  $("#project-container").show();
  $("#common").removeClass("active");
  $("#service-business").removeClass("active");
  $("#project-business").addClass("active");

  loadProject();
};

const getData = async () => {
  const option = {
    method: "GET",
  };
  const url = URL_BASE + "/page";
  const res = await fetch(url, option);
  return res.json();
};
