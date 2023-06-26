(function() {
    'use strict';
  
    var tasker = {
      init: function() {
        this.cacheDom();
        this.bindEvents();
        this.evalTasklist();
      },
      cacheDom: function() {
        this.taskInput = document.getElementById("input-task");
        this.addBtn = document.getElementById("add-task-btn");
        this.tasklist = document.getElementById("tasks");
        this.tasklistChildren = this.tasklist.children;
        this.errorMessage = document.getElementById("error");
      },
      bindEvents: function() {
        this.addBtn.addEventListener('click', this.addTask.bind(this));
        this.taskInput.addEventListener('keypress', this.enterKey.bind(this));
      },
      evalTasklist: function() {
        for (var i = 0; i < this.tasklistChildren.length; i++) {
          var chkBox = this.tasklistChildren[i].querySelector("input[type='checkbox']");
          chkBox.addEventListener('click', this.completeTask.bind(this, this.tasklistChildren[i], chkBox));
  
          var delBtn = this.tasklistChildren[i].querySelector("button");
          delBtn.addEventListener('click', this.delTask.bind(this, i));
        }
      },
      render: function() {
        var taskLi = document.createElement("li");
        taskLi.className = "task";
  
        var taskChkbx = document.createElement("input");
        taskChkbx.type = "checkbox";
  
        var taskVal = document.createTextNode(this.taskInput.value);
  
        var taskBtn = document.createElement("button");
        var taskTrsh = document.createElement("i");
        taskTrsh.className = "fa fa-trash";
  
        taskBtn.appendChild(taskTrsh);
  
        taskLi.appendChild(taskChkbx);
        taskLi.appendChild(taskVal);
        taskLi.appendChild(taskBtn);
  
        this.tasklist.appendChild(taskLi);
      },
      completeTask: function(taskItem, chkBox) {
        if (chkBox.checked) {
          taskItem.className = "task completed";
        } else {
          this.incompleteTask(taskItem);
        }
      },
      incompleteTask: function(taskItem) {
        taskItem.className = "task";
      },
      enterKey: function(event) {
        if (event.keyCode === 13 || event.which === 13) {
          this.addTask();
        }
      },
      addTask: function() {
        var value = this.taskInput.value.trim();
        this.errorMessage.style.display = "none";
  
        if (value === "") {
          this.error();
        } else {
          this.render();
          this.taskInput.value = "";
          this.evalTasklist();
        }
      },
      delTask: function(index) {
        this.tasklist.children[index].remove();
        this.evalTasklist();
      },
      error: function() {
        this.errorMessage.style.display = "block";
      }
    };
  
    tasker.init();
  })();
  