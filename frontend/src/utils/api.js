
class Api {
    constructor(options) {
        this._address = options.address;
    }

    handleOriginalResponse(res) { 
        if (res.ok) { 
        return res.json() 
        } 
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInformation(jwt) {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                authorization: `Bearer ${jwt}`,
            },
        })
        .then((res) => this.handleOriginalResponse(res))
    }

    editUserInformation(data, jwt) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                authorization: `Bearer ${jwt}`
        },
            body: JSON.stringify({
                name:data.name,
                about:data.about,
            }),
        })
        .then((res) => this.handleOriginalResponse(res))
    }


    getInitialCards(jwt) {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    authorization: `Bearer ${jwt}`
            },
        })
        .then((res) => this.handleOriginalResponse(res))
    }

    addCard(data, jwt) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
        .then((res) => this.handleOriginalResponse(res))
    }
    removeCard(id, jwt) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                authorization: `Bearer ${jwt}`
            },
        })
        .then((res) => this.handleOriginalResponse(res))
    }

    editAvatarUser(data, jwt) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
        .then((res) => this.handleOriginalResponse(res))
    }

    changeLikeCardStatus(id, isLiked, jwt) {
        if(isLiked){
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    authorization: `Bearer ${jwt}`
                },
            })
            .then((res) => this.handleOriginalResponse(res))
        } else {
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    authorization: `Bearer ${jwt}`
                },
            })
            .then((res) => this.handleOriginalResponse(res))
        }

    }
}


const api = new Api({
    address: "https://api.kisboo.mesto.nomoredomains.monster",
})
export default api;