import Vue from 'vue'
import {
  decamelizeKeys,
  camelizeKeys
} from 'humps'

import {
  default as swal
} from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'


export default function _fetch(url, data) {
  let queryString = paramToString(data);
  if (url.indexOf('?') > -1) {
    if (queryString) {
      url = `${url}&${queryString}`;
    }
  } else {
    if (queryString) {
      url = `${url}?${queryString}`;
    }
  }

  let config = {}
  config.headers = {

  }

  return Vue.http
    .get(url, config)
    .then(_status)
    .then(_json)
    .then(_acl)
    .then(_camelizeKeys)
    .then(_log(url, data))
    .then(_transformData);
}

/**
 * fetch.get
 * @url
 * @data GET Query数据（JSON数据会自动将camel的KEY转成下划线格式）
 * @return  promise的实例
 */
_fetch.get = (url, data) => {
  data = decamelizeKeys(data);
  return _fetch(url, data);
}

/**
 * fetch.post
 * @url 路径
 * @data POST 数据（JSON数据会自动将camel的KEY转成下划线格式）
 * @isUsedMultiPart 是否采用 multi/part 格式（上传文件使用）
 * @return  promise的实例
 */
_fetch.post = (url, data, isUsedMultiPart = false) => {
  if (!isUsedMultiPart) { // 如果使用 Multi-part 则不自动改 camel key
    data = decamelizeKeys(data);
  }
  data = isUsedMultiPart ?
    paramByFormData(new FormData(), data) :
    paramToString(data);
  let config = {};
  if (isUsedMultiPart) {
    config.transformRequest = (d) => d;
    config.headers = {
      'Context-Type': false
    };
    config.isUsedMultiPart = true; // for http interceptor
  }

  return Vue.http
    .post(url, data, config)
    .then(_status)
    .then(_json)
    .then(_acl)
    .then(_camelizeKeys)
    .then(_log(url, data))
    .then(_transformData);
}

_fetch.paramToString = paramToString;

function paramToString(obj) {
  let query = '',
    name, value, fullSubName, subName, subValue, innerObj, i;

  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += paramToString(innerObj) + '&';
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += paramToString(innerObj) + '&';
      }
    } else if (value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' +
        encodeURIComponent(value) + '&';
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query;
}

function paramByFormData(formData, obj) {
  let name, value, fullSubName, subName, subValue, innerObj, i;

  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        // query += paramToString(innerObj) + '&';
        paramByFormData(formData, innerObj);
      }
    } else if (value instanceof Object && String(value) !== '[object File]') {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        // query += paramToString(innerObj) + '&';
        paramByFormData(formData, innerObj);
      }
    } else if (value !== undefined && value !== null) {
      // query += encodeURIComponent(name) + '=' +
      //   encodeURIComponent(value) + '&';
      formData.append(name, value);
    }
  }
  // return query.length ? query.substr(0, query.length - 1) : query;
  return formData;
}


function _status(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText)
    error.response = response;
    throw error;
  }
}

// check acl
function _acl(data) {
  // check if it is <script>window.location.....</script>
  // login session
  if (typeof data === 'string') {
    console.warn(`status warning: ${JSON.stringify(data)}`);
    if (/^\<script\>/.test(data) && data.indexOf('window.location') !== -1) {
      return window.location = '/';
    }
  }
  return data;
}

function _json(response) {
  // var { data } = response;
  // if (data) {
  //   try {
  //     var json = JSON.parse(data); 
  //   } catch (ex) {
  //     _acl(data);
  //     throw ex;
  //   }
  // } 
  // return json;
  return response.json();
}

function _log(url, body) {

  return (data) => {
    /*
    if (__DEV__) {
      // console.log(`url: ${url}`);
      // if (body) {
      //   console.log('body', body);
      // }
      // console.table(data);
      console.info(`url: ${url}\nres:`, data, '\n\n');

    }
    */
    return data;
  };
}


function _camelizeKeys(data) {
  return camelizeKeys(data);
}

function _transformData(res) {
  var {
    status,
    info,
    data
  } = res;

  if (status !== 200) {
    swal('error', info, 'error');
    throw new Error(info);
  }
  return data;
}
