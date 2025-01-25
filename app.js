var currentDeg = 0;
var colors = ["#4C7B8B", "#9ACBD0", "#48A6A7", "#2973B2", "#3B6790", "#3B2790", "#FFCC66"];
var items = ["10K", "50K", "200K", "20K", "50K", "100K", "10K", "200K", "100K", "20K"];
var theChoosenIndex;
var choosenHistory = [];
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
  // Vô hiệu hóa nút quay ngay khi nhấn
  $("#spin-action").prop("disabled", true);

  currentDeg = currentDeg + Math.floor(Math.random() * 360 + 360 * 5);
  $("#wheel").css({
    transform: "rotate(" + currentDeg + "deg)",
  });

  setTimeout(function () {
    const theChoosen = getTheChoosen(currentDeg);

    // Hiển thị kết quả trong modal
    if (items.length > 2) {
      $("#result-modal #remove-the-choosen-btn").show();
    } else {
      $("#result-modal #remove-the-choosen-btn").hide();
    }
    $("#result-modal .modal-body").text(theChoosen);
    $("#result-modal").modal();
    choosenHistory.push(theChoosen);

    // Gửi email với kết quả
    sendMail(theChoosen);
  }, 8000);
}

function getTheChoosen(deg) {
  theChoosenIndex =
    (Math.ceil((deg % 360) / (360 / items.length) + 0.5) - 1) % items.length;
  return items[theChoosenIndex];
}

function sendMail(result) {
  const subject = `${userName}`;
  const message = `Dã quay được: ${result}`;

  const params = {
    subject: subject,
    message: message,
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
