const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-27',
    headers: {
      authorization: '1cf2c5b3-38df-486b-8ee2-069807f9e05d',
      'Content-Type': 'application/json'
    }
  }

  function checkResult(res) {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

  export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: config.headers
    }).then(checkResult);
    
  }
  export const patchUserInfoChange = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(checkResult);
  }

  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: config.headers
    })
      .then(checkResult);
  } 

  export const postNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(checkResult);
  }

  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId} `,{
      method: "DELETE",
      headers: config.headers
    }).then(checkResult);
  }
  
  export const putMyLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId} `,{      
      method: "PUT",
      headers: config.headers
    }).then(checkResult);
  }

  export const deleteMyLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId} `,{      
      method: "DELETE",
      headers: config.headers
    }).then(checkResult);
  }
  
  export const patchUserAvatarChange = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then(checkResult);
  }

  
  