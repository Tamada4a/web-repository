class Card {
    constructor(id, name, provider, src, desc) {
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.src = src;
        this.desc = desc;
    }
}


function loadCards() {
    let cards = JSON.parse(window.localStorage.getItem("cards"));

    if (cards === null)
        return;

    for (let i = 0; i < cards.length; ++i) {
        const divCard = document.createElement("div");
        divCard.id = `card${i}`;
        divCard.setAttribute('class', "card");
        document.getElementsByClassName("cards-list")[0].appendChild(divCard);

        const divCardContent = document.createElement("div");
        divCardContent.id = `cardContent${i}`;
        divCardContent.setAttribute('class', "card__content flex__column-start");
        document.getElementById(`card${i}`).appendChild(divCardContent);


        const divCardSubtitle = document.createElement("div");
        divCardSubtitle.id = `cardSubtitle${i}`;
        divCardSubtitle.setAttribute('class', "card__subtitle flex__space-between");
        document.getElementById(`cardContent${i}`).appendChild(divCardSubtitle);

        const divCardId = document.createElement("span");
        divCardId.id = `cardId${i}`;
        divCardId.textContent = `ID: ${cards[i].id} (${cards[i].provider})`;
        document.getElementById(`cardSubtitle${i}`).appendChild(divCardId);

        const divCardEdit = document.createElement("a");
        divCardEdit.id = `cardEdit${i}`;
        divCardEdit.textContent = "Изменить";
        divCardEdit.type = "edit";
        divCardEdit.addEventListener('click', onOpenEditForm);
        document.getElementById(`cardSubtitle${i}`).appendChild(divCardEdit);


        const divCardSubcontent = document.createElement("div");
        divCardSubcontent.id = `cardSubcontent${i}`;
        divCardSubcontent.setAttribute('class', "card__subcontent flex__start");
        document.getElementById(`cardContent${i}`).appendChild(divCardSubcontent);

        const divCardImg = document.createElement("img");
        divCardImg.id = `cardImg${i}`;
        divCardImg.src = `${cards[i].src}`;
        divCardImg.alt = `${cards[i].name}`;
        document.getElementById(`cardSubcontent${i}`).appendChild(divCardImg);

        const divCardName = document.createElement("span");
        divCardName.id = `cardName${i}`;
        divCardName.textContent = cards[i].name;
        divCardName.setAttribute('class', "card__name");
        document.getElementById(`cardSubcontent${i}`).appendChild(divCardName);

        const divCardDesc = document.createElement("span");
        divCardDesc.id = `cardDesc${i}`;
        divCardDesc.textContent = cards[i].desc;
        divCardDesc.setAttribute('class', "card__desc");
        document.getElementById(`cardContent${i}`).appendChild(divCardDesc);
    }
}


function setupCards() {
    let dataArray = [
        new Card(1, "Шляпа", "КАВЫЧКИ", "https://sun9-18.userapi.com/impg/A_Lj-kVXuvg_jZPvZxH9juy6_vs6yfHaz_0PFg/knrhYcAMpb8.jpg?size=1280x748&quality=95&sign=3f08bfc66ab1a471ddc4dcb8cadea8f8&type=album", "Спокойна как удав"),
        new Card(2, "Духи", "КАВЫЧКИ", "https://sun9-38.userapi.com/impg/sXsjopI2sfCLgw8E5fCjLM1UnTFQl_fXxeX_qA/OIwGXujcxk0.jpg?size=1280x962&quality=96&sign=608a35c938f3a6e6755a05fae2207b06&type=album", "Духи с биполяркой"),
        new Card(3, "Зайка на машинке", "Google", "https://i.pinimg.com/736x/42/99/69/4299698015b43062ca1f022416f53df6.jpg", "Едем едем в соседнее село"),
        new Card(4, "Чупакабра", "NeuroLavcraft", "https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/5/31/756806793338315.webp", "Лавкрафт написал сказку про арбуз"),
        new Card(5, "Котёнок", "Smile", "https://avatars.mds.yandex.net/i?id=dc7361b95e9b0527c543cbb558a72055_l-5878560-images-thumbs&n=27&h=480&w=480", "Милое пушистое очарование")
    ];
    updateLocalStorage(dataArray);
    location.reload();
}


function addCard() {
    let cards = JSON.parse(window.localStorage.getItem("cards"));

    if (cards === null) {
        cards = [];
    }

    let id = document.getElementsByName('idCreate')[0].value;
    let name = document.getElementsByName('nameCreate')[0].value;
    let provider = document.getElementsByName('providerCreate')[0].value;
    let src = document.getElementsByName('srcCreate')[0].value;
    let desc = document.getElementsByName('descCreate')[0].value;

    if (id === "" || provider === "" || name === "" || src === "") {
        closeForm('createForm');
        return;
    }
    let card = new Card(id,
        name,
        provider,
        src,
        desc);

    cards.push(card);

    updateLocalStorage(cards);

    closeForm('createForm');
    location.reload();
}


function onOpenEditForm(event) {
    let id = event.target.id.substring(8);
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.at(id);
    document.getElementsByName('idEdit')[0].value = card.id;
    document.getElementsByName('nameEdit')[0].value = card.name;
    document.getElementsByName('providerEdit')[0].value = card.provider;
    document.getElementsByName('srcEdit')[0].value = card.src;
    document.getElementsByName('descEdit')[0].value = card.desc;
    document.getElementById("edit-btn").idx = id;
    document.getElementById("delete-btn").idx = id;
    openForm('editForm');
}


function editCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));

    cards[event.target.idx].id = document.getElementsByName('idEdit')[0].value;
    cards[event.target.idx].name = document.getElementsByName('nameEdit')[0].value;
    cards[event.target.idx].provider = document.getElementsByName('providerEdit')[0].value;
    cards[event.target.idx].src = document.getElementsByName('srcEdit')[0].value;
    cards[event.target.idx].desc = document.getElementsByName('descEdit')[0].value;

    updateLocalStorage(cards);

    closeForm('editForm');
    location.reload();
}


function deleteCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(event.target.idx, 1);

    updateLocalStorage(cards);

    closeForm('editForm');
    location.reload();
}


function updateLocalStorage(cards) {
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}


const setupBtn = document.getElementById('setup-btn');
setupBtn.addEventListener('click', setupCards);

window.onload = loadCards;