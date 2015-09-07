define(function(){"use strict";var a={copyLocales:function(b){var c=['<div class="copy-locales-overlay-content">',"   <label>",this.sandbox.translate("content.contents.settings.copy-locales.copy-from"),"   </label>",'   <div class="grid m-top-10">','       <div class="grid-row">','       <div id="copy-locales-select" class="grid-col-6"/>',"   </div>","</div>",'<h2 class="divider m-top-20">',this.sandbox.translate("content.contents.settings.copy-locales.target"),"</h2>",'<p class="info">',"   * ",this.sandbox.translate("content.contents.settings.copy-locales.info"),"</p>",'<div class="copy-locales-to-container m-bottom-20 grid">'],d=0;return this.sandbox.util.foreach(this.localizations,function(e){d%2===0&&c.push((d>0?"</div>":"")+'<div class="grid-row">'),c.push(a.copyLocalesCheckbox.call(this,e.title,b)),d++}.bind(this)),c.push("</div>"),c.push("</div>"),c.join("")},copyLocalesCheckbox:function(a,b){var c,d=[];for(var e in this.data.concreteLanguages)this.data.concreteLanguages.hasOwnProperty(e)&&d.push(this.data.concreteLanguages[e]);return c=a===this.options.language&&d.indexOf(a)>=0,['<div class="grid-col-3">','   <div class="custom-checkbox">','       <input type="checkbox"','              id="copy-locales-to-',a,'"','              name="copy-locales-to" class="form-element" value="',a,'"',c?' disabled="disabled"':"","/>",'       <span class="icon"></span>',"   </div>",'   <label for="copy-locales-to-',a,'" class="',c?"disabled":"",'">',a,d.indexOf(a)<0?" *":"","   </label>","</div>"].join("")}},b=function(a,b,c,d,e){var f=this.getCopyLocaleUrl(a,b,c.join(","));this.sandbox.util.save(f,"POST",{}).then(function(a){d&&"function"==typeof d&&d(a)}.bind(this)).fail(function(a,b,c){e&&"function"==typeof e&&e(c)}.bind(this))},c=function(a){var c=this.sandbox.dom.data("#copy-locales-select","selection"),d=this.sandbox.dom.find('.copy-locales-to-container input:checked:not(input[disabled="disabled"])'),e=[];return this.sandbox.util.foreach(d,function(a){e.push(this.sandbox.dom.val(a))}.bind(this)),c&&0!==c.length&&0!==e.length?(this.sandbox.off("husky.select.copy-locale-to.deselected.item",f.bind(this)),this.sandbox.off("husky.select.copy-locale-to.selected.item",g.bind(this)),b.call(this,this.data.id,c[0],e),void a.resolve()):!1},d=function(b,d){this.sandbox.start([{name:"overlay@husky",options:{openOnStart:!0,removeOnClose:!0,el:b,container:this.$el,instanceName:"copy-locales",skin:"wide",slides:[{title:this.sandbox.translate("content.contents.settings.copy-locales.title"),data:a.copyLocales.call(this,this.data),buttons:[{type:"cancel",align:"right"},{type:"ok",text:this.sandbox.translate("content.contents.settings.copy-locales.ok"),align:"left"}],okCallback:function(){c.call(this,d)}.bind(this)}]}}])},e=function(a){this.sandbox.start([{name:"select@husky",options:{el:"#copy-locales-select",instanceName:"copy-locale-to",defaultLabel:this.sandbox.translate("content.contents.settings.copy-locales.default-label"),preSelectedElements:[this.options.language],data:a}}])},f=function(a){var b="copy-locales-to-"+a;this.sandbox.dom.prop("#"+b,"disabled",""),this.sandbox.dom.removeClass('label[for="'+b+'"]',"disabled")},g=function(a){var b="copy-locales-to-"+a;this.sandbox.dom.prop("#"+b,"disabled","disabled"),this.sandbox.dom.addClass('label[for="'+b+'"]',"disabled")};return{copyLocale:function(a,c,d,e,f){b.call(this,a,c,d,e,f)},startCopyLocalesOverlay:function(){var a=this.sandbox.data.deferred(),b=this.sandbox.dom.createElement('<div class="overlay-container"/>'),c=[],h=this.sandbox.translate("content.contents.settings.copy-locales.current-language");return this.sandbox.dom.append(this.$el,b),this.sandbox.util.foreach(this.data.concreteLanguages,function(a){c.push({id:a,name:a+(a===this.options.language?" ("+h+")":"")})}.bind(this)),this.sandbox.on("husky.select.copy-locale-to.deselected.item",f.bind(this)),this.sandbox.on("husky.select.copy-locale-to.selected.item",g.bind(this)),d.call(this,b,a),e.call(this,c),a.promise()}}});