const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};

class Api {
    constructor({ address, token, groupId }) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
    }

    getUserInformation() {
        return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(handleOriginalResponse);
    }

    editUserInformation(data) {
        return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            }),
        }).then(handleOriginalResponse);
    }

    getInitialCards() {
        return fetch(`${this._address}/v1/${this._groupId}/cards`, {
            headers: {
                authorization: this._token,
            },
        }).then(handleOriginalResponse);
    }
    addCard(data) {
        return fetch(`${this._address}/v1/${this._groupId}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(handleOriginalResponse);
    }
    removeCard(id) {
        return fetch(`${this._address}/v1/${this._groupId}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(handleOriginalResponse);
    }

    editAvatarUser(data) {
        return fetch(`${this._address}/v1/${this._groupId}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(handleOriginalResponse);
    }
/*
    removeLike(id) {
        return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(handleOriginalResponse);
        //(result => result.ok ? result.json() : Promise.reject(`Ошибка ${result.status}`))
    }
*/
    changeLikeCardStatus(id, isLiked) {
        if(isLiked){
            return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${id}`, {
                method: "PUT",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json",
                },
            }).then(handleOriginalResponse);
        } else {
            return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json",
                },
            }).then(handleOriginalResponse);
        }

    }
}

const api = new Api({
    address: "https://mesto.nomoreparties.co",
    token: "39d70764-e5af-4ea0-b4da-e670479603af",
    groupId: "cohort-19",
});
export default api;
