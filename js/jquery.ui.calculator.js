(function($){

// Namespacing out our calculator plugin for jQuery.
$.widget("ui.calculator",{

   options: {
       autoShow: true,
       currentSum: []
   },
   _create: function(){
      var div = $("<div />"),
         list = $("<ul></ul>", {
                   "class" : "ui-helper-reset ui-helper-clearfix"
                }),
           li = $("<li />", {
                   "class" : "ui-corner-all ui-state-default"
                }),
            a = $("<a />", {
                   "href"  : "#",
                   "class" : "ui-calculator-button" 
                }),
    container = div.clone().addClass("ui-calculator-container ui-corner-all ui-widget-content ui-helper-clearfix"),
    display   = div.clone().addClass("ui-corner-all ui-widget-content ui-calculator-display").text("0").appendTo(container),
    numberpad = div.clone().addClass("ui-calculator-numberpad").appendTo(container),
  functionpad = div.clone().addClass("ui-calculator-functionpad").appendTo(container),
   numberlist = list.clone().appendTo(numberpad),
 functionlist = list.clone().appendTo(functionpad),
      buttons = ["","clear",7,8,9,4,5,6,1,2,3,0,"."],
    functions = ["/","*","-","+","="];


    for( var x = 0; x < buttons.length; x++ ){
       var listitem = li.clone().appendTo(numberlist),
              linky = a.clone().text(buttons[x]).appendTo(listitem);
       if( x === 0 ){
         $("<span />", {
            "class" : "ui-calculator-icon ui-icon ui-icon-arrowthick-1-w",
            "text"  : "Backspace"
         }).appendTo(linky);
       } else if( x === 1 || buttons[x] === 0 ){
          linky.addClass("ui-calculator-button-wide");
       }
    }
    for( var y = 0; y < functions.length; y++ ){
       var listitem2 = li.clone().addClass("ui-state-default").appendTo(functionlist),
           linky2 = a.clone().text(functions[y]).appendTo(listitem2);
    }

    this.element.addClass("ui-calculator ui-widget ui-helper-reset");
    (this.options.autoShow) ?
       container.appendTo(this.element) :
       container.appendTo(this.element).hide();
    this.element.find("li").bind({
       mouseenter: this._addHoverState,
       mouseleave: this._removeHoverState,
       click: this._buttonClick
    });
   },
   destroy: function(){
     $.Widget.prototype.destroy.call(this, arguments);
     this.element.removeClass("ui-calculator ui-widget ui-helper-reset");
     this.element.find("li").unbind();
     this.element.children(":first").remove();
   },
   disable: function(){
     $.Widget.prototype.disable.call(this,arguments);
     this.element.find("li").unbind();
   },
   enable: function(){
     $.Widget.prototype.enable.call(this, arguments);
     this.element.find("li").bind({
       mouseenter: this._addHoverState,
       mouseleave: this._removeHoverState,
       click: this._buttonClick
     });
   },
   show: function(){
     var el = this.element.children(":first");
     if( el.is(":hidden") ){
       el.show();
     }
     this._trigger("show", null, this.element);
   },
   _addHoverState: function(){
      $(this).addClass("ui-state-hover");
   },
   _removeHoverState: function(){
      $(this).removeClass("ui-state-hover");
   },
   _buttonClick: function(){
     var buttonText = $(this).text(),
         display = $(".ui-calculator-display"),
         newArray = $.ui.calculator.prototype.options.currentSum;
     if( buttonText == "Backspace" ) {
       if( display.text() !== "0" && display.text().length > 1){
         newArray.pop();
         $.ui.calculator.prototype.options.currentSum = newArray;
         display.text( function(i, orig){
            return orig.substring(0, orig.length - 1);
         });
       }
     } else if ( buttonText == "clear" ) {
       $.ui.calculator.prototype.options.currentSum = [];
       display.text("0");
     } else if ( buttonText == "/" || buttonText == "*" || buttonText == "-" || buttonText == "+" ){
       $.ui.calculator.prototype.options.currentSum.push( buttonText );
       display.text( buttonText );
     } else {
       $.ui.calculator.prototype.options.currentSum.push( buttonText );
       if( display.text() == "0" ||
           display.text() == "/" ||
           display.text() == "*" ||
           display.text() == "-" ||
           display.text() == "+" ){

           display.text("");
       }
       display.text( function( i, orig ){  return orig + buttonText; } )

     }
   }
} );

}(jQuery) );
