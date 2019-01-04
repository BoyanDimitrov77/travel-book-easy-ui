import { API_BASE_URL ,USERNAME, PASSWORD} from '../constants/constants';

// const request = (options) => {
//     const headers = new Headers({
//         'Content-Type': 'application/json',
//     })
//
//     if(localStorage.getItem(USERNAME) && localStorage.getItem(PASSWORD)) {
//
//         var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');
//         headers.append('Authorization', auth);
//       //  headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
//     }
//
//     const defaults = {headers: headers};
//     options = Object.assign({}, defaults, options);
//
//     return fetch(options.url, options)
//     .then(response =>
//         response.json().then(json => {
//             if(!response.ok) {
//                 return Promise.reject(json);
//             }
//             return json;
//         })
//     );
// };

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

export function createTrainRequest(createTrainRequest){


  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/train/create/createTrainRecord/"+ createTrainRequest.selectedCompanyId,
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth },
    body: JSON.stringify(createTrainRequest)

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

export function createBusRequest(createBusRequest){

  var auth = 'Basic ' + new Buffer(localStorage.getItem(USERNAME) + ':' + localStorage.getItem(PASSWORD)).toString('base64');

  const options = {
    url: API_BASE_URL + "/bus/create/createBusRecord/"+ createBusRequest.selectedCompanyId,
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
                'Authorization' : auth },
    body: JSON.stringify(createBusRequest)

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

export function fetchImage(imgeUrl){

  var auth = 'Bearer ya29.Gl2BBkMuV9dPHOcasQYrFHt0wDZzAM2r9bYFYRslQXuvvzkZtvZGJE1l4MEFTrMG6NT_hYF5o3IBtShSFONUd-t-yOVti2iP76bZvt329ofGUj1UXuQXhdnnIEsYK9k';

  const options = {
    url: imgeUrl,
    method: 'GET',
     headers: {'Accept': 'application/json',
        'Content-Type': 'application/json',
             'Authorization' : auth }

  }

  return fetch(options.url, options)
  .then((response) =>{
    return response;
  }).then((data)=>{
    return data;
  })

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
