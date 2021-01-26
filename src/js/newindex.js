const { ipcRenderer } = require('electron');

// recieve app version and send it to html 
ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
  ipcRenderer.removeAllListeners('app_version');
  const version = document.getElementById('version');
  version.innerText = 'v' + arg.version;
});

//when you click the home button
$("#homeButton").click(function (e) {

  if ($("#homeButton").hasClass("page-selected")) {

  } else {
    console.log('toggle home button on')
    $("#homeButton").toggleClass("page-selected");
    //we are toggling the button on 
    $("#new-upload-html").hide();
    $("#upload-selection-html").hide();
    $("#default-home-html").show();
    //untoggle newUploadButton button if needed 
    if ($("#newUploadButton").hasClass('page-selected')) {
      $("#newUploadButton").toggleClass("page-selected");
    }
    //untoggle UploadsList button if needed 
    if ($("#menu-toggle").hasClass('svg-selected')) {
      $("#menu-toggle").toggleClass("svg-selected");
      $("#wrapper").toggleClass("toggled");
    }
  }

});

//when you click the NewUpload button
$("#newUploadButton").click(function (e) {

  if ($("#newUploadButton").hasClass("page-selected")) {

  } else {

    console.log('toggle new upload button on')
    $("#newUploadButton").toggleClass("page-selected");
    //we are toggling the button on 
    $("#new-upload-html").show();
    $("#default-home-html").hide();
    $("#upload-selection-html").hide();
    //untoggle home button if needed
    if ($("#homeButton").hasClass('page-selected')) {
      $("#homeButton").toggleClass("page-selected");
    }
    //untoggle UploadsList button if needed 
    if ($("#menu-toggle").hasClass('svg-selected')) {
      $("#menu-toggle").toggleClass("svg-selected");
      $("#wrapper").toggleClass("toggled");
    }
  }
});

//when you click the Uploads list button
$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");

  if ($("#menu-toggle").hasClass("svg-selected")) {
    console.log('toggle Uploads button off')
    //go back to home
    $("#homeButton").toggleClass("page-selected");
    $("#new-upload-html").hide();
    $("#default-home-html").show();
    $("#upload-selection-html").hide();
  } else {
    console.log('toggle Uploads button on')
    $("#new-upload-html").hide();
    $("#default-home-html").hide();
    $("#upload-selection-html").show();
    //if 'selected' is on for homeButton, toggle it off
    if ($("#homeButton").hasClass('page-selected')) {
      $("#homeButton").toggleClass("page-selected");
    }
    //if 'selected' is on for newUploadButton, toggle it off
    if ($("#newUploadButton").hasClass('page-selected')) {
      $("#newUploadButton").toggleClass("page-selected");
    }
  }

  $("#menu-toggle").toggleClass("svg-selected");
});

$(document).ready(function () {

  init();

  $("#wrapper").on('change', 'input', function () {
    console.log(" .change() called.");
  });

  $('#wrapper').on('classChange', function () {
    console.log(" class changed");
  });

  $("#sidebar-toggle").on('hidden.bs.collapse', function () {
    console.log("Handler for .change() called.");
  });


  $("#sidebar-nav").on('hidden.bs.collapse', function () {
    console.log("Handler for .change() called.");
  });

});

async function init(){
  var uploadList = await JSON.parse(localStorage.getItem('uploadList'))
  if(!uploadList){
    console.log('localstorage uploadList not exist', uploadList)
    setLocalStorage('uploadList', {})
  }else{
    console.log('localstorage uploadList do exist: ', uploadList)
  }
}

//clear uploadList
async function setLocalStorage(itemName, itemValue){
  let result = await localStorage.setItem(itemName, JSON.stringify(itemValue))
}