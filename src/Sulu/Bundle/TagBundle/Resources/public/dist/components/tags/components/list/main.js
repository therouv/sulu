define(function(){"use strict";var a={datagridInstanceName:"tags",instanceNameToolbar:"saveToolbar"},b=function(){this.sandbox.on("sulu.toolbar.add",function(){this.sandbox.emit("husky.datagrid."+a.datagridInstanceName+".record.add",{id:"",name:"",changed:"",created:"",author:""})}.bind(this)),this.sandbox.on("sulu.toolbar.delete",function(){this.sandbox.emit("husky.datagrid."+a.datagridInstanceName+".items.get-selected",function(a){this.sandbox.emit("sulu.tags.delete",a)}.bind(this))},this),this.sandbox.on("husky.datagrid."+a.datagridInstanceName+".number.selections",function(b){var c=b>0?"enable":"disable";this.sandbox.emit("husky.toolbar."+a.instanceNameToolbar+".item."+c,"deleteSelected",!1)}.bind(this)),this.sandbox.on("husky.datagrid."+a.datagridInstanceName+".data.save.failed",function(a){a.responseJSON&&a.responseJSON.code&&c.call(this,a.responseJSON.code)},this),this.sandbox.on("husky.datagrid."+a.datagridInstanceName+".number.selections",function(a){var b=a>0?"enable":"disable";this.sandbox.emit("sulu.header.toolbar.item."+b,"deleteSelected",!1)}.bind(this))},c=function(a){var b="";switch(a){case 1101:b="tag.error.notUnique"}this.sandbox.emit("sulu.labels.error.show",b,"labels.error","")};return{layout:{content:{width:"max"}},header:{noBack:!0,toolbar:{buttons:{add:{},deleteSelected:{}}}},templates:["/admin/tag/template/tag/list"],initialize:function(){this.render(),b.call(this)},render:function(){this.sandbox.dom.html(this.$el,this.renderTemplate("/admin/tag/template/tag/list")),this.sandbox.sulu.initListToolbarAndList.call(this,"tags","/admin/api/tags/fields",{el:this.$find("#list-toolbar-container"),template:"default",listener:"default",instanceName:a.instanceNameToolbar},{el:this.sandbox.dom.find("#tags-list",this.$el),url:"/admin/api/tags?flat=true",resultKey:"tags",searchFields:["name"],instanceName:a.datagridInstanceName,viewOptions:{table:{editable:!0,validation:!0}}},"tags","#tags-list-info")}}});