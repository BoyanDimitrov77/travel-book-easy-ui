import { API_BASE_URL ,USERNAME, PASSWORD} from '../constants/constants';

export function login(loginRequest) {
  localStorage.setItem(USERNAME,loginRequest.email);
  localStorage.setItem(PASSWORD, loginRequest.password);

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/authenticate",
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'Authorization' : auth }

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function createFlightRequest(createFlightRequest){
    var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/flight/create/createFlightRecord/"+ createFlightRequest.selectedCompanyId,
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                  'Authorization' : auth },
      body: JSON.stringify(createFlightRequest)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function allCompany(){
  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/company/all",
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};


export function createCompanyRequest(createCompanyRequest){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/company/create/createCompanyRecord",
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth },
    body: JSON.stringify(createCompanyRequest)

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function uploadCompanyLogo(companyLogo, companyId){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/company/uploadCompanyLogo/" + companyId,
    method: 'POST',
     headers: {
                 'Authorization' : auth },
    body: companyLogo

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function getAllFlights(){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/flight/all",
    method: 'GET',
     headers: {'Content-Type': 'application/json',
                 'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function fetchImage(imgeUrl, token){
  var auth = 'Bearer ' + token;

  const options = {
    url: imgeUrl,
    method: 'GET',
     headers: {
             'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then((response) =>{
    return response.arrayBuffer();
  }).then((buffer)=>{
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  })

};


export function getGoogleClientToken(){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/users/accessTokenGD",
    method: 'GET',
     headers: {'Content-Type': 'application/json',
                 'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};


export function bookFlightRequest(flightId){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/booking/bookFlight/" + flightId,
    method: 'POST',
     headers: {'Content-Type': 'application/json',
                 'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function addPassengersToBookedFlight(flightBookingId, travelClassId, passengers){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/booking/bookFlight/addPassengers/" + flightBookingId +"/" + travelClassId,
    method: 'POST',
     headers: {'Content-Type': 'application/json',
                 'Authorization' : auth },
     body: JSON.stringify(passengers)

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function getClientToken(){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/booking/clientToken" ,
    method: 'GET',
     headers: {'Content-Type': 'application/json',
                 'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function paymentFlight(amount, flightBookId, travelClassId, nonceFromTheClient ){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');
  const queryParams = "amount=" + amount +"&"+ "flightBookId="+ flightBookId +"&"+ "travelClassId=" + travelClassId +"&"+ "nonceFromTheClient="+ nonceFromTheClient;
  const options = {
    url: API_BASE_URL + "/booking/bookFlight/payment?"+ queryParams ,
    method: 'POST',
     headers: {'Content-Type': 'application/json',
                 'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function searchFlights(searchRequest){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/flight/searchFlights",
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth },
    body: JSON.stringify(searchRequest)

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function findCompany(companyId){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/company/" + companyId,
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function ratingCompany(companyId, rating){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/company/ratingCompany/" + companyId + "?rating=" + rating,
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function createCompanyComment(companyId, comment){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/company/createComment/" + companyId + "?comment=" + comment,
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function registrationUser(registrationRequest){

    const options = {
      url: API_BASE_URL + "/register",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationRequest)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function resetUserPassword(requestObject){

    const options = {
      url: API_BASE_URL + "/users/resetPassword",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestObject)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function resetAndChangeUserPassword(requestObject, verificationToken){

    const options = {
      url: API_BASE_URL + "/verification/" + verificationToken,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestObject)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function changeUserPassword(requestObject){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/users/changePassword",
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  },
      body: JSON.stringify(requestObject)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function changeUserInfo(requestObject){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/users/updatePersonalInformation",
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  },
      body: JSON.stringify(requestObject)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function updateFlight(requestObject){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/flight/update",
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  },
      body: JSON.stringify(requestObject)

    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function getAllUsers(){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/users/all",
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  }
    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function uploadProfilePicture(profilePicture){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/users/uploadProfilePhoto/",
    method: 'POST',
     headers: {
                 'Authorization' : auth },
    body: profilePicture

  }

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
          if(!response.ok) {
              return Promise.reject(json);
          }
          return json;
      })
  );

};

export function enableUser(enabled, userId){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/users/enableUser/" + userId + "?enabled=" + enabled,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  }
    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function getAllFlightBookings(){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/users/allFlightBookings",
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  }
    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function getAllCompaniesOrderByRating(){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/company/allCompanyOrderByRating",
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  }
    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};

export function updateCompanyName(companyId, name){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

    const options = {
      url: API_BASE_URL + "/company/updateCompany/" + companyId + "?name=" + name,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
      'Authorization' : auth  }
    }

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );

};
