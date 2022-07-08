let pics = [
  { id: 1, title: "Летний Вуди", photo: 1, img: "morj.jpg" },
  { id: 2, title: "Довольный Вуди", photo: 2, img: "me.jpg" },
  { id: 3, title: "Гриф Базз Баззард", photo: 6, img: "woody.png" },
];

const toHtml = (pic) =>
  `<div class="col">
<div class="card">
  <img class="card-img-top"; src="${pic.img}" alt=""${pic.title}"" />
  <div class="card-body">
    <h5 class="card-title">"${pic.title}"</h5>
    
    <div class="btn">
      <a href="#" class="btn btn-primary" data-btn="pick" data-id="${pic.id}">Выбрать</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id = "${pic.id}">Убрать</a>
    </div>
  </div>
</div>
</div>`;

function render() {
  const html = pics.map(toHtml).join("");
  document.querySelector("#pics").innerHTML = html;
}

render();

const picModal = $.modal({
  title: "Ваш выбор!",
  closable: true,

  width: "400px",
  footerButtons: [
    {
      text: "close",
      type: "primary",
      handler() {
        console.log("Primary btn clicked");
        picModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const pic = pics.find((c) => c.id === id);

  if (btnType === "pick") {
    const pic = pics.find((c) => c.id === id);
    picModal.setContent(`
    <p>Вы выбрали   ${pic.title}: <strong>${pic.photo}</strong> </p>`);
    picModal.open();
  } else if (btnType === "remove") {
    $.confirm({
      title: "Ты уверен?",
      content: `<p>Убрать картинку:  <strong>${pic.title}</strong></p>`,
    })
      .then(() => {
        pics = pics.filter((c) => c.id !== id);
        render();
      })
      .catch(() => {
        console.log("Cancel");
      });
  }
});
