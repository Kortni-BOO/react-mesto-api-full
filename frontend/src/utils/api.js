const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};

class Api {
    constructor( config ) {
        this.address = config.address;
        this.headers = config.headers;
    }

    getUserInformation() {
        return fetch(`${this.address}/users/me`, {
            headers: this.headers,
        }).then(handleOriginalResponse);
    }

    editUserInformation(data) {
        return fetch(`${this.address}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            }),
        }).then(handleOriginalResponse);
    }

    getInitialCards() {
        return fetch(`${this.address}/cards`, {
            headers: this.headers,
        }).then(handleOriginalResponse);
    }
    addCard(data) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(handleOriginalResponse);
    }
    removeCard(id) {
        return fetch(`${this.address}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(handleOriginalResponse);
    }

    editAvatarUser(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
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
            return fetch(`${this.address}/cards/${id}/likes`, {
                method: "PUT",
                headers: this.headers,
            }).then(handleOriginalResponse);
        } else {
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "DELETE",
                headers: this.headers,
            }).then(handleOriginalResponse);
        }

    }
}

const api = new Api({
    address: "https://api.kisboo.mesto.nomoredomains.monster",
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
       "Content-Type": "application/json",
    },
});
export default api;
