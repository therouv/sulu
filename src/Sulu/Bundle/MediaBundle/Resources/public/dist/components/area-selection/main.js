define(["underscore","jquery","text!./frame.html"],function(a,b,c){"use strict";var d={eventNamespace:"sulu.area-selection",instanceName:"",image:null,areaGuidingWidth:null,areaGuidingHeight:null,data:null,resizeable:!0,draggable:!0,tileSelectable:!1,tileRow:1,tileColumn:1},e={minimumSizeReached:"sulu-media.minimum-size-reached"},f={tileRows:3,tileColumns:3,selectedTileClass:"selected",arrowUpClass:"up",arrowUpRightClass:"up-right",arrowRightClass:"right",arrowDownRightClass:"down-right",arrowDownClass:"down",arrowDownLeftClass:"down-left",arrowLeftClass:"left",arrowUpLeftClass:"up-left"},g=function(){return k.call(this,"initialized")},h=function(){return k.call(this,"area-changed")},i=function(){return k.call(this,"tile-selected")},j=function(){return k.call(this,"set-area-guide-dimensions")},k=function(a){return this.options.eventNamespace+"."+(this.options.instanceName?this.options.instanceName+".":"")+a};return{placeTileSelection:function(){if(this.options.tileSelectable&&b.isNumeric(this.options.tileRow)&&b.isNumeric(this.options.tileColumn)){var a=this.$el.find([".lines *:nth-child(",this.options.tileRow+1,") ",".tile:nth-child(",this.options.tileColumn+1,")"].join(""));this.selectTile(a)}},initialize:function(){this.options=this.sandbox.util.extend(!0,{},d,this.options),this.$frame=null,this.$backdrop=null,this.originalWidth=null,this.originalHeight=null,this.areaGuidingWidth=this.options.areaGuidingWidth,this.areaGuidingHeight=this.options.areaGuidingHeight,this.physicalAreaGuidingWidth=null,this.physicalAreaGuidingHeight=null,this.area={$el:null,coordinates:{x:null,y:null,width:null,height:null}},this.$el.data("area",{x:null,y:null,width:null,height:null}),this.options.draggable&&(this.dragging={enabled:!1,clickOffsetLeft:0,clickOffsetTop:0}),this.options.resizeable&&(this.resizing={enabled:!1,clickOffsetLeft:0,clickOffsetTop:0}),this.data=this.options.data,this.renderFrame().then(function(){this.bindCustomEvents(),this.placeSelection(),this.bindDomEvents(),this.bindDragEvents(),this.bindResizeEvents(),this.placeTileSelection(),this.sandbox.emit(g.call(this),this.originalWidth,this.originalHeight)}.bind(this))},bindCustomEvents:function(){this.sandbox.on(j.call(this),function(a,b,c){this.areaGuidingWidth=a,this.areaGuidingHeight=b,this.data=c,this.placeSelection()}.bind(this))},placeSelection:function(){return this.physicalAreaGuidingWidth=this.areaGuidingWidth*this.$frame.width()/this.originalWidth,this.physicalAreaGuidingHeight=this.areaGuidingHeight*this.$frame.height()/this.originalHeight,this.areaGuidingWidth&&this.areaGuidingWidth>this.originalWidth||this.areaGuidingHeight&&this.areaGuidingHeight>this.originalHeight||!this.areaGuidingWidth&&!this.areaGuidingHeight?(this.area.$el.hide(),void this.$backdrop.hide()):(this.computeInitialAreaCoordinates(),this.area.$el.show(),void this.$backdrop.show())},destroy:function(){b(document).off(".area-selection"+this.options.instanceName)},renderFrame:function(){this.$frame=b(a.template(c,{image:this.options.image,minimumSizeInfo:this.sandbox.translate(e.minimumSizeReached),resizeable:this.options.resizeable,tileSelectable:this.options.tileSelectable}));var d=b.Deferred(),f=this.$frame.find(".image");return f.one("load",function(){var a;this.setImageSize(f),a=f[0].getBoundingClientRect(),this.$frame.width(a.width),this.$frame.height(a.height),this.$frame.removeClass("invisible"),d.resolve()}.bind(this)),f.one("error",function(){d.fail()}),this.$el.addClass("sulu-area-selection"),this.$frame.addClass("invisible"),this.$el.append(this.$frame),this.area.$el=this.$frame.find(".area"),this.area.$el.hide(),this.$backdrop=this.$frame.find(".backdrop"),this.$backdrop.hide(),this.options.draggable&&this.area.$el.css("cursor","move"),this.options.tileSelectable&&(this.$lines=this.$el.find(".lines"),this.$tileArrows=this.$lines.find(".tile .arrow"),this.$tileArrowMatrix=[[this.$tileArrows[0],this.$tileArrows[3],this.$tileArrows[6]],[this.$tileArrows[1],this.$tileArrows[4],this.$tileArrows[7]],[this.$tileArrows[2],this.$tileArrows[5],this.$tileArrows[8]]]),d},selectTile:function(a){this.$el.find(".lines .tile").removeClass(f.selectedTileClass),a.addClass(f.selectedTileClass),this.setTileArrows(a)},setTileArrows:function(a){var b=a.index(),c=a.parent().index();this.$tileArrows.removeClass(f.arrowUpClass),this.$tileArrows.removeClass(f.arrowUpRightClass),this.$tileArrows.removeClass(f.arrowRightClass),this.$tileArrows.removeClass(f.arrowDownRightClass),this.$tileArrows.removeClass(f.arrowDownClass),this.$tileArrows.removeClass(f.arrowDownLeftClass),this.$tileArrows.removeClass(f.arrowLeftClass),this.$tileArrows.removeClass(f.arrowUpLeftClass),this.setTileArrow(b,c-1,f.arrowUpClass),this.setTileArrow(b+1,c-1,f.arrowUpRightClass),this.setTileArrow(b+1,c,f.arrowRightClass),this.setTileArrow(b+1,c+1,f.arrowDownRightClass),this.setTileArrow(b,c+1,f.arrowDownClass),this.setTileArrow(b-1,c+1,f.arrowDownLeftClass),this.setTileArrow(b-1,c,f.arrowLeftClass),this.setTileArrow(b-1,c-1,f.arrowUpLeftClass)},setTileArrow:function(a,c,d){0>a||0>c||a>=f.tileColumns||c>=f.tileRows||b(this.$tileArrowMatrix[a][c]).addClass(d)},setImageSize:function(a){this.originalHeight=a.height(),this.originalWidth=a.width(),a.height()/a.width()>this.$el.height()/this.$el.width()?a.height(Math.min(a.height(),this.$el.height())):a.width(Math.min(a.width(),this.$el.width()))},bindDomEvents:function(){this.area.$el.on("dblclick",function(){var a=this.dataToCoordinates(this.getMaximumCenteredData());this.setAreaPosition(a),this.setAreaSize(a)}.bind(this)),this.area.$el.on("click",".tile",function(a){var c=b(a.currentTarget);this.selectTile(c),this.sandbox.emit(i.call(this),c.index(),c.parent().index())}.bind(this)),this.area.$el.on("mousedown",function(){b(document).on("selectstart.area-selection"+this.options.instanceName,!1)}.bind(this)),b(document).on("mouseup.area-selection"+this.options.instanceName,function(){b(document).off("selectstart.area-selection"+this.options.instanceName)}.bind(this))},bindDragEvents:function(){this.options.draggable&&(this.area.$el.on("mousedown",":not(.handle)",function(a){this.dragging.enabled=!0,this.dragging.clickOffsetLeft=a.pageX-this.area.$el.offset().left,this.dragging.clickOffsetTop=a.pageY-this.area.$el.offset().top}.bind(this)),b(document).on("mousemove.area-selection."+this.options.instanceName,a.throttle(function(a){this.dragging.enabled&&this.setAreaPosition({x:a.pageX-this.$frame.offset().left-this.dragging.clickOffsetLeft,y:a.pageY-this.$frame.offset().top-this.dragging.clickOffsetTop})}.bind(this),10)),b(document).on("mouseup.area-selection."+this.options.instanceName,function(){this.dragging.enabled&&this.sandbox.emit(h.call(this)),this.dragging.enabled=!1,this.dragging.clickOffsetLeft=0,this.dragging.clickOffsetTop=0}.bind(this)))},bindResizeEvents:function(){this.options.resizeable&&(this.area.$el.on("mousedown",".handle.south-east",function(a){this.resizing.enabled=!0,this.resizing.clickOffsetLeft=a.pageX-this.area.$el.offset().left-this.area.$el.width(),this.resizing.clickOffsetTop=a.pageY-this.area.$el.offset().top-this.area.$el.height()}.bind(this)),b(document).on("mousemove.area-selection."+this.options.instanceName,a.throttle(function(a){this.resizing.enabled&&this.setAreaSize({width:a.pageX-this.area.$el.offset().left-this.resizing.clickOffsetLeft,height:a.pageY-this.area.$el.offset().top-this.resizing.clickOffsetTop})}.bind(this),10)),b(document).on("mouseup.area-selection."+this.options.instanceName,function(){this.resizing.enabled&&this.sandbox.emit(h.call(this)),this.resizing.enabled=!1,this.resizing.clickOffsetLeft=0,this.resizing.clickOffsetTop=0}.bind(this)))},computeInitialAreaCoordinates:function(){var a;a=this.data?this.dataToCoordinates(this.data):this.dataToCoordinates(this.getMaximumCenteredData()),this.area.coordinates=a,this.setAreaPosition(a),this.setAreaSize(a)},setAreaPosition:function(b){b=this.sandbox.util.extend(!0,{},this.area.coordinates,b),b=this.getConstrainedPosition(b),this.$el.data("area",a.extend(this.$el.data("area"),{x:Math.floor(b.x*this.originalWidth/this.$frame.width()),y:Math.floor(b.y*this.originalHeight/this.$frame.height())})),this.area.$el.css("left",Math.round(b.x)+"px"),this.area.$el.css("top",Math.round(b.y)+"px"),this.area.coordinates.x=b.x,this.area.coordinates.y=b.y,this.$backdrop.css("left",Math.round(b.x)+"px"),this.$backdrop.css("top",Math.round(b.y)+"px")},setAreaSize:function(b){b=this.sandbox.util.extend(!0,{},this.area.coordinates,b),b=this.getConstrainedSize(b),this.$el.data("area",a.extend(this.$el.data("area"),{width:Math.floor(b.width*this.originalWidth/this.$frame.width()),height:Math.floor(b.height*this.originalHeight/this.$frame.height())})),(this.areaGuidingWidth&&this.$el.data("area").width<=this.areaGuidingWidth||this.areaGuidingHeight&&this.$el.data("area").height<=this.areaGuidingHeight)&&this.options.resizeable?this.area.$el.addClass("minimum-size-reached"):this.area.$el.removeClass("minimum-size-reached"),this.area.$el.width(Math.round(b.width)),this.area.$el.height(Math.round(b.height)),this.area.coordinates.width=b.width,this.area.coordinates.height=b.height,this.$backdrop.width(Math.round(b.width)),this.$backdrop.height(Math.round(b.height))},getConstrainedPosition:function(a){return a.x=Math.max(0,a.x),a.x=Math.min(this.$frame.width()-this.area.coordinates.width,a.x),a.y=Math.max(0,a.y),a.y=Math.min(this.$frame.height()-this.area.coordinates.height,a.y),a},getConstrainedSize:function(a){return a.width=Math.min(this.$frame.width()-this.area.coordinates.x,a.width),a.height=Math.min(this.$frame.height()-this.area.coordinates.y,a.height),this.areaGuidingWidth&&this.areaGuidingHeight&&(a.height=a.width*this.areaGuidingHeight/this.areaGuidingWidth,a.height>this.$frame.height()-this.area.coordinates.y&&(a.height=this.$frame.height()-this.area.coordinates.y,a.width=a.height*this.areaGuidingWidth/this.areaGuidingHeight)),this.areaGuidingWidth&&(a.width=Math.max(this.physicalAreaGuidingWidth,a.width)),this.areaGuidingHeight&&(a.height=Math.max(this.physicalAreaGuidingHeight,a.height)),a.width=Math.max(1,a.width),a.height=Math.max(1,a.height),a},getMaximumCenteredData:function(){var a={};return this.areaGuidingWidth&&this.areaGuidingHeight?this.areaGuidingWidth/this.areaGuidingHeight>this.originalWidth/this.originalHeight?(a.width=this.originalWidth,a.height=a.width*this.areaGuidingHeight/this.areaGuidingWidth,a.x=0,a.y=this.originalHeight/2-a.height/2):(a.height=this.originalHeight,a.width=a.height*this.areaGuidingWidth/this.areaGuidingHeight,a.y=0,a.x=this.originalWidth/2-a.width/2):(a.width=this.originalWidth,a.height=this.originalHeight,a.x=0,a.y=0),a},dataToCoordinates:function(a){return{x:a.x*this.$frame.width()/this.originalWidth,y:a.y*this.$frame.height()/this.originalHeight,width:a.width*this.$frame.width()/this.originalWidth,height:a.height*this.$frame.height()/this.originalHeight}}}});