const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};

class Api {
    constructor(config) {
        this._address = config.address;
    }

    getUserInformation() {
        return fetch(`${this._address}/users/me`, {
            headers: this.headers,
            credentials: 'include',
        }).then(handleOriginalResponse);
    }

    editUserInformation(data) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            }),
            
        }).then(handleOriginalResponse);
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            headers: this.headers,
            credentials: 'include',
        }).then(handleOriginalResponse);
    }
    addCard(data) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
           
        }).then(handleOriginalResponse);
    }
    removeCard(id) {
        return fetch(`${this._address}/v1/${this._groupId}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
            credentials: 'include',
        }).then(handleOriginalResponse);
    }

    editAvatarUser(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            credentials: 'include',
            body: JSON.stringify({
                avatar: data.avatar,
            }),
            
        }).then(handleOriginalResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked){
            return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${id}`, {
                method: "PUT",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            }).then(handleOriginalResponse);
        } else {
            return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            }).then(handleOriginalResponse);
        }

    }
}

const api = new Api({
    address: "http://api.kisboo.mesto.nomoredomains.monster",
    
});
export default api;