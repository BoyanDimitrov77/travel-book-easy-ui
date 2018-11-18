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

export function createFlight(createFlightRequest){
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

export function createTrain(createTrainRequest){


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

export function createBus(createBusRequest){

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

}

export function getAllCompany(){
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
