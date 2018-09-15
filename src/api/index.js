
const baseURL = "https://hacker-news.firebaseio.com/v0/";

export function makeAjaxRequest(url, methodType, data){
  var xhr = new XMLHttpRequest();
  xhr.open(methodType, URL, null);
  xhr.send();
  xhr.onreadystatechange = function(){
     if (xhr.readyState === 4){
        if (xhr.status === 200){
           console.log("xhr done successfully");
           var resp = xhr.responseText;
           var respJson = JSON.parse(resp);
           return respJson;
        } else {
          console.log("xhr failed");
        }
     } else {
        console.log("xhr processing going on");
     }
  }
}

export function fetchTopStories(){
  debugger;
  ids = makeAjaxRequest(url, "GET", {}, fetchItem);
  console.log(items);
  items = fetchItems(ids);
  return items;
}

export function fetchItems(ids){
  var items = [];
  for(var i=0; i<=ids.length; i++){
    items.push(fetchItem(ids[i]));
  }
  return items;
}

export function fetchItem(id){
  return makeAjaxRequest(url, "GET", {});
}

export function renderItem(data){

}
