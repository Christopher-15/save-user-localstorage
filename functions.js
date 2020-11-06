(function() {
  'use strict';
  var lastId = 0;
  var userTable = document.getElementById("user_table");
  var btnSave = document.getElementById("save_user");
  var removeIcon;
  var updateIcon;
  var userList;
  // Initialize taskList
  // Add event to save button
  // Render the list

  function init() {

    if (!!(window.localStorage.getItem('userList'))) {
      userList = JSON.parse(window.localStorage.getItem('userList'));
    } else {
      userList = [];
    }
    btnSave.addEventListener('click', saveUser);
    showList();

  }

  //End Init

  //CRUD task

  function showList() {

    if (!!userList.length) {
      getLastUserId();
      for (var item in userList) {
        var user = userList[item];
        addUserToList(user);
      }
      syncEvents();
    }

  }

  function saveUser(event) {

    var user = {
      userId: lastId,
      userName: document.getElementById("user_name").value,
      userInfo: document.getElementById("user_info").value

    };
    userList.push(user);
    syncUser();
    addUserToList(user);
    syncEvents();
    lastId++;
  }

  function addUserToList(user) {

    var removeIcon = document.createElement('span');
    var element = document.createElement('li');
    var updateIcon = document.createElement('span');

    removeIcon.innerHTML = "Delete";
    removeIcon.className = "remove_item clickeable";
    removeIcon.setAttribute("title", "Remove");

    updateIcon.innerHTML = "Edit"
    updateIcon.className = "update_icon clickeable";
    updateIcon.setAttribute("title", "Update");


    element.appendChild(removeIcon);
    element.appendChild(updateIcon);
    element.setAttribute("id", user.userId);
    element.innerHTML += (" ");
    element.innerHTML += (user.userName);
    element.innerHTML += (" ");
    element.innerHTML += (user.userInfo);

    userTable.appendChild(element);
  }

  function updateUser(event) {

    var userTag = event.currentTarget.parentNode;
    var userId = userTag.id;
    var userToUpdate = findUser(userId).user;
    var pos = findUser(userId).pos;
    if (!!userToUpdate) {
      var Name = prompt("Username", userToUpdate.userName);
      var Info = prompt("User info", userToUpdate.userInfo);

      userToUpdate.userName = Name;
      userToUpdate.userInfo = Info;
      userList[pos] = userToUpdate;

      userTag.lastChild.textContent = userToUpdate.userName+(" ")+userToUpdate.userInfo;

      syncUser();

    }
  }

  function removeUser(event) {
if(confirm("Delete This Record?")) {
    var userToRemove = event.currentTarget.parentNode;
    var userId = userToRemove.id;
    userTable.removeChild(userToRemove);
    userList.forEach(function(value, i) {
      if (value.userId == userId) {
        userList.splice(i, 1);
      }
    })

    syncUser();
  }
}
  // End CRUD


  //Common

  function syncUser() {

    window.localStorage.setItem('userList', JSON.stringify(userList));
    userList = JSON.parse(window.localStorage.getItem('userList'));
  }

  function getLastUserId() {
    var lastUser = userList[userList.length - 1];
    lastId = lastUser.userId + 1;
  }

  function syncEvents() {

    updateIcon = document.getElementsByClassName("update_icon");
    removeIcon = document.getElementsByClassName("remove_item");
    if (!!removeIcon.length) {
      for (var i = 0; i < removeIcon.length; i++) {
        removeIcon[i].addEventListener('click', removeUser);
      }
    }
    if (!!updateIcon.length) {
      for (var j = 0; j < updateIcon.length; j++) {
        updateIcon[j].addEventListener('click', updateUser);
      }
    }
  }

  function findUser(id) {

    var response = {
      task: '',
      pos: 0
    };
    userList.forEach(function(value, i) {
      if (value.userId == id) {
        response.user = value;
        response.pos = i;
      }
    });

    return response;
  }

  //End Common

  init();



})();
