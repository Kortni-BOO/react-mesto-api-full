/*
const handleOriginalResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
};
*/

class Api {
    constructor(options) {
        this._address = options.address;
        this._headers = options.headers;
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
                Authorization: `Bearer ${jwt}`,
            },
        })
        .then((res) => this.handleOriginalResponse(res))
    }

    editUserInformation(data) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
                avatar: data.avatar,
            }),
        })
        //.then(handleOriginalResponse);
    }


    getInitialCards(jwt) {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`
            },
        })
        .then((res) => this.handleOriginalResponse(res))
    }

    addCard(data) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        })
        //.then(handleOriginalResponse);
    }
    removeCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: this._token,
                "Content-Type": "application/json",
            },
        })
        //.then(handleOriginalResponse);
    }

    editAvatarUser(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
        //.then(handleOriginalResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked){
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "PUT",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json",
                },
            })
            //.then(handleOriginalResponse);
        } else {
            return fetch(`${this._address}/cards/${id}/likes`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json",
                },
            })
            //.then(handleOriginalResponse);
        }

    }
}


const api = new Api({
    //address: "https://api.kisboo.mesto.nomoredomains.monster",
    address:"http://localhost:3000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //"Authorization" : `Bearer ${localStorage.getItem('jwt')}`
    }
})
export default api;