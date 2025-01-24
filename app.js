var currentDeg = 0;
var colors = ["#4C7B8B", "#9ACBD0", "#48A6A7", "#2973B2", "#3B6790", "#FFCC66"];
var items = ["10K", "20K", "50K", "100K", "200K", "500K"];
var theChoosenIndex;
var choosenHistory = [];
let userName = "";

window.onload = function () {
  userName = prompt("Vui lòng nhập tên của bạn:");
  if (!userName) {
    alert("Bạn phải nhập tên để tiếp tục!");
    window.location.reload(); 
  }
};

init();

function init() {
  if (items.length > 1) {
    var degPerPart = 360 / items.length;

    for (let i = 0; i < items.length; i++) {
      var part = $("<div>");
      8;
      part.addClass("part");
      part.css({
        "background-color": colors[i % colors.length],
      });
      part.html('<div class="name">' + items[i] + "</div>");
      if (items.length === 2) {
        part.css({
          height: "100%",
          transform: "rotate(" + i * degPerPart + "deg)",
        });
      } else {
        part.css({
          height: Math.tan(((degPerPart / 2) * Math.PI) / 180) * 100 + "%",
          transform: "translateY(-50%) rotate(" + i * degPerPart * -1 + "deg)",
          "clip-path": "polygon(0 0, 0 100%, 100% 50%)",
          top: "50%",
        });
      }
      $("#wheel").append(part);
      $(".wheel-wrapper").show();
    }
  }
}
function onSpin() {
  currentDeg = currentDeg + Math.floor(Math.random() * 360 + 360 * 5);
  $("#wheel").css({
    transform: "rotate(" + currentDeg + "deg)",
  });
  $("#spin-action").prop("disabled", true);
  setTimeout(function () {
    var theChoosen = getTheChoosen(currentDeg);
    $("#spin-action").prop("disabled", false);
    if (items.length > 2) {
      $("#result-modal #remove-the-choosen-btn").show();
    } else {
      $("#result-modal #remove-the-choosen-btn").hide();
    }
    $("#result-modal .modal-body").text(theChoosen);
    $("#result-modal").modal();
    choosenHistory.push(theChoosen);

    sendMail(theChoosen);
  }, 7000);
}
function getTheChoosen(deg) {
  theChoosenIndex =
    (Math.ceil((deg % 360) / (360 / items.length) + 0.5) - 1) % items.length;
  return items[theChoosenIndex];
}

function sendMail(result) {
  const subject = `Kết quả từ ${userName}`;
  const message = `${userName} đã quay được: ${result}`;

  const params = {
    subject: subject,
    message: message,
    user_name: userName, 
  };
  const serviceID = "service_qsefo9o";
  const templateID = "template_2rxiljg";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
}
