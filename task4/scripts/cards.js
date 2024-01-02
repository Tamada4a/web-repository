class Card {
    constructor(id, name, provider, src, desc) {
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.src = src;
        this.desc = desc;
    }
}


function loadAll() {
    loadCards();
    loadOwnerInfo();
}


async function loadCards() {
    document.getElementById('preloader_id').classList.remove('hide');
    try {
        let cards = await fetch('http://localhost:3000/cards').then(res => res.json());
        let skeletonCards = document.getElementsByClassName('skeleton');
        for (let i = 0; i < skeletonCards.length; ++i) {
            skeletonCards[i].classList.add('hide');
        }

        if (cards.length === 0)
            return;

        for (let i = 0; i < cards.length; ++i) {
            loadCard(cards[i]);
        }

    } catch (err) {
        alert("Не удалось загрузить карточки");
    }
    document.getElementById('preloader_id').classList.add('hide');
}


async function loadOwnerInfo() {
    try {
        let owner = await fetch('http://localhost:3000/owner_info').then(res => res.json());

        let ownerGithub = document.getElementById('owner_github');
        ownerGithub.textContent = `${owner.name} ${owner.group}`;
        ownerGithub.href = owner.github;

        document.getElementById('owner_copyright').textContent = `© 2023 ${owner.name}`;

        let ownerMail = document.getElementById('owner_mail');
        ownerMail.textContent = owner.mail;
        ownerMail.href = `mailto:${owner.mail}`;

        document.getElementById('owner_premail').textContent = "По вопросам пишите на ";
    } catch (err) {
        alert("Не удалось загрузить информацию об авторе");
    }

}


function loadCard(card) {
    const divCard = document.createElement("div");
    divCard.id = `card${card.id}`;
    divCard.setAttribute('class', "card");
    document.getElementsByClassName("cards-list")[0].appendChild(divCard);

    const divCardContent = document.createElement("div");
    divCardContent.id = `cardContent${card.id}`;
    divCardContent.setAttribute('class', "card__content flex__column-start");
    document.getElementById(`card${card.id}`).appendChild(divCardContent);


    const divCardSubtitle = document.createElement("div");
    divCardSubtitle.id = `cardSubtitle${card.id}`;
    divCardSubtitle.setAttribute('class', "card__subtitle flex__space-between");
    document.getElementById(`cardContent${card.id}`).appendChild(divCardSubtitle);

    const divCardId = document.createElement("span");
    divCardId.id = `cardId${card.id}`;
    divCardId.textContent = `ID: ${card.id} (${card.provider})`;
    document.getElementById(`cardSubtitle${card.id}`).appendChild(divCardId);

    const divCardEdit = document.createElement("a");
    divCardEdit.id = `cardEdit${card.id}`;
    divCardEdit.textContent = "Изменить";
    divCardEdit.type = "edit";
    divCardEdit.addEventListener('click', onOpenEditForm);
    document.getElementById(`cardSubtitle${card.id}`).appendChild(divCardEdit);


    const divCardSubcontent = document.createElement("div");
    divCardSubcontent.id = `cardSubcontent${card.id}`;
    divCardSubcontent.setAttribute('class', "card__subcontent flex__start");
    document.getElementById(`cardContent${card.id}`).appendChild(divCardSubcontent);

    const divCardImg = document.createElement("img");
    divCardImg.id = `cardImg${card.id}`;
    divCardImg.src = `${card.src}`;
    divCardImg.alt = `${card.name}`;
    document.getElementById(`cardSubcontent${card.id}`).appendChild(divCardImg);

    const divCardName = document.createElement("span");
    divCardName.id = `cardName${card.id}`;
    divCardName.textContent = card.name;
    divCardName.setAttribute('class', "card__name");
    document.getElementById(`cardSubcontent${card.id}`).appendChild(divCardName);

    const divCardDesc = document.createElement("span");
    divCardDesc.id = `cardDesc${card.id}`;
    divCardDesc.textContent = card.desc;
    divCardDesc.setAttribute('class', "card__desc");
    document.getElementById(`cardContent${card.id}`).appendChild(divCardDesc);
}


async function setupCards() {
    document.getElementById('preloader_id').classList.remove('hide');
    let dataArray = [
        new Card(1, "Шляпа", "КАВЫЧКИ", "https://sun9-18.userapi.com/impg/A_Lj-kVXuvg_jZPvZxH9juy6_vs6yfHaz_0PFg/knrhYcAMpb8.jpg?size=1280x748&quality=95&sign=3f08bfc66ab1a471ddc4dcb8cadea8f8&type=album", "Спокойна как удав"),
        new Card(2, "Духи", "КАВЫЧКИ", "https://sun9-38.userapi.com/impg/sXsjopI2sfCLgw8E5fCjLM1UnTFQl_fXxeX_qA/OIwGXujcxk0.jpg?size=1280x962&quality=96&sign=608a35c938f3a6e6755a05fae2207b06&type=album", "Духи с биполяркой"),
        new Card(3, "Зайка на машинке", "Google", "https://i.pinimg.com/736x/42/99/69/4299698015b43062ca1f022416f53df6.jpg", "Едем едем в соседнее село"),
        new Card(4, "Чупакабра", "NeuroLavcraft", "https://s0.rbk.ru/v6_top_pics/resized/590xH/media/img/5/31/756806793338315.webp", "Лавкрафт написал сказку про арбуз"),
        new Card(5, "Котёнок", "Smile", "https://avatars.mds.yandex.net/i?id=dc7361b95e9b0527c543cbb558a72055_l-5878560-images-thumbs&n=27&h=480&w=480", "Милое пушистое очарование")
    ];

    let cards = document.getElementsByClassName("card");
    for (let i = cards.length - 1; i > 0; --i) {
        let cardId = cards[i].id;
        if (cardId)
            document.getElementById(cardId).remove();
    }

    let skeletonCards = document.getElementsByClassName('skeleton');
    for (let i = 0; i < skeletonCards.length; ++i) {
        skeletonCards[i].classList.remove('hide');
    }

    try {
        let allCards = await fetch('http://localhost:3000/cards').then(res => res.json());
        for (let i = 0; i < allCards.length; ++i) {
            await fetch(`http://localhost:3000/cards/${allCards[i].id}`, {
                method: 'DELETE'
            });
        }

        for (let i = 0; i < dataArray.length; ++i) {
            await fetch('http://localhost:3000/cards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(dataArray[i])
            });
        }
    } catch (err) {
        alert("Не удаётся загрузить карточки");
    }
    loadCards();
}


async function addCard() {
    let id = document.getElementsByName('idCreate')[0].value;
    let name = document.getElementsByName('nameCreate')[0].value;
    let provider = document.getElementsByName('providerCreate')[0].value;
    let src = document.getElementsByName('srcCreate')[0].value;
    let desc = document.getElementsByName('descCreate')[0].value;

    if (id === "" || provider === "" || name === "" || src === "") {
        closeForm('createForm');
        return;
    }
    document.getElementById('preloader_id').classList.remove('hide');
    let card = new Card(id,
        name,
        provider,
        src,
        desc);
    try {
        await fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        });
    } catch (err) {
        alert("Что-то пошло не так");
    }
    closeForm('createForm');
    document.getElementById('preloader_id').classList.add('hide');
    loadCard(card);
}


async function onOpenEditForm(event) {
    let id = event.target.id.substring(8);
    let card = await fetch(`http://localhost:3000/cards/${id}`).then((res) => res.json());
    document.getElementsByName('idEdit')[0].value = card.id;
    document.getElementsByName('nameEdit')[0].value = card.name;
    document.getElementsByName('providerEdit')[0].value = card.provider;
    document.getElementsByName('srcEdit')[0].value = card.src;
    document.getElementsByName('descEdit')[0].value = card.desc;
    document.getElementById("edit-btn").idx = id;
    document.getElementById("delete-btn").idx = id;
    openForm('editForm');
}


async function editCard(event) {
    try {
        let card = await fetch(`http://localhost:3000/cards/${event.target.idx}`).then((res) => res.json());
        if (card.id === document.getElementsByName('idEdit')[0].value &&
            card.name === document.getElementsByName('nameEdit')[0].value &&
            card.provider === document.getElementsByName('providerEdit')[0].value &&
            card.src === document.getElementsByName('srcEdit')[0].value &&
            card.desc === document.getElementsByName('descEdit')[0].value) {
            closeForm('editForm');
            return;
        }
        card.id = document.getElementsByName('idEdit')[0].value;
        card.name = document.getElementsByName('nameEdit')[0].value;
        card.provider = document.getElementsByName('providerEdit')[0].value;
        card.src = document.getElementsByName('srcEdit')[0].value;
        card.desc = document.getElementsByName('descEdit')[0].value;

        await fetch(`http://localhost:3000/cards/${event.target.idx}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        });
        location.reload();
        closeForm('editForm');
    } catch (err) {
        alert("Не удалось изменить карточку");
    }
}


async function deleteCard(event) {
    try {
        await fetch(`http://localhost:3000/cards/${event.target.idx}`, {
            method: 'DELETE'
        });
        closeForm('editForm');
        document.getElementById(`card${event.target.idx}`).remove();
    } catch (err) {
        alert("Не удалось удалить карточку");
    }
}

const setupBtn = document.getElementById('setup-btn');
setupBtn.addEventListener('click', setupCards);

loadAll();