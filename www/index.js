/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var jQT;

$(document).ready(function() {
    //  New Prototypes
    if (!String.prototype.startsWith) {
            String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
            };
    }
    //  Init JQTouch
    jQT = $.jQTouch({
            icon: '/maphone/images/launcher.png',
            useAnimations: false,
            statusBar: 'black',
            addGlossToIcon: true
    });
        
    //  Setup Event Handler in index.html
    
    $('#btnC').bind('click', function(e){
        pushbtn('C');
    });
    
    $('#btnD').bind('click', function(e){
        pushbtn('D');
    });
            
    $('#btnC').bind('ondblclick', function(evt){
        evt.preventDefault(); // cancel system's default double click
    });
    
    document.getElementById("divtelno").addEventListener("keydown", function(event) {filter(event);});
    document.getElementById("divtelno").addEventListener("keyup", function(event) {
        var n = $('#divtelno').val();
        setTelno(n);
    });
    
    $('#btn0').bind('click', function(event) { pushbtn('0'); });
    $('#btn1').bind('click', function(event) { pushbtn('1'); });
    $('#btn2').bind('click', function(event) { pushbtn('2'); });
    $('#btn3').bind('click', function(event) { pushbtn('3'); });
    $('#btn4').bind('click', function(event) { pushbtn('4'); });
    $('#btn5').bind('click', function(event) { pushbtn('5'); });
    $('#btn6').bind('click', function(event) { pushbtn('6'); });
    $('#btn7').bind('click', function(event) { pushbtn('7'); });
    $('#btn8').bind('click', function(event) { pushbtn('8'); });
    $('#btn9').bind('click', function(event) { pushbtn('9'); });
    
    $('#dial1').bind('click', function (event) {dial($('#telno1').val()); }); 
    $('#dial2').bind('click', function (event) {dial($('#telno2').val()); }); 
    $('#dial3').bind('click', function (event) {dial($('#telno3').val()); }); 
    
    $('#form').bind('submit', function (event) {
        saveSettings();
        jQT.goBack();
    });
        
    document.getElementById("telno1").addEventListener("keydown", function(event) {filter1(event);});
    document.getElementById("telno2").addEventListener("keydown", function(event) {filter1(event);});
    document.getElementById("telno3").addEventListener("keydown", function(event) {filter1(event);});
      
    //  Init LocalStorage Variables
   
    var telno=(localStorage.telno!=undefined?localStorage.telno:'');
    setTelno(telno);
        
    for (var i=1; i<4; i++) {
        $('#name'+i).val(localStorage['name'+i]!=undefined?localStorage['name'+i]:'');
        $('#telno'+i).val(localStorage['telno'+i]!=undefined?localStorage['telno'+i]:'');
    }
    saveSettings();
    
    app.initialize();
    
});
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.amendLinks('external-link');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        
        console.log('Received Event: ' + id);
        $('#devmanufacturer').text(device.manufacturer);
        $('#devplatform').text(device.platform);
        $('#devmodel').text(device.model);
        $('#devversion').text(device.version);
    },
    // Find everything with class className and open it
    // with the InAppBrowser
    amendLinks: function(className) {
        var n = 0,
            links = document.getElementsByClassName(className);

        for (; n < links.length; n++) {
            links[n].onclick = function(e) {
                e.preventDefault();
                window.open(''.concat(this.href), '_blank');
            }
        }
    }
}

    //  Main functions in alphabetical order
    
    function dial(telno) {
        window.open('tel:+49'+removeZero(telno),'_system');
        console.log('now location href: ' + telno);
        document.location.href = 'tel:+49'+removeZero(telno);
    }
    
    function filter(event) {
        var event = event || window.event;
        if (!isNaN(event.key) || event.code=="Backspace" || event.code == "Delete") {
            return;
        } else {
            event.preventDefault();
            return false;
        }
    }
    
    function filter1(event) {
        var event = event || window.event;
        if (!isNaN(event.key) || event.code=="Backspace" || event.code == "Delete") {
        
        } else {
            event.preventDefault();
            return false;
        } 
    }
        
    function pushbtn(n) {
        var telno = localStorage.telno;
        if (n=='C') {
            var l = telno.length;
            var pos = document.getElementById("divtelno").selectionStart;
            if (pos>0) {
                telno = telno.substring(0,pos-1)+telno.substring(pos);
            } else {
                telno = telno.substring(0,l-1);
            }
            localStorage.telno=telno;
            setTelno(telno);
            //  leave out: will cause the keyboard to pop up on phone - same with $().focus(): document.getElementById("divtelno").selectionStart = telno.length+1;
        } else if (n=='D') {
            if (telno>'0') {   
                dial(telno);      //location.href='tel:+49'+removeZero(telno);
            }
            return;
        } else {
            telno = telno + n;
            localStorage.telno=telno;
            setTelno(telno);
        }
    }
        
    function removeZero(s) {
        if (s==undefined) return s;
        var o = s;
        if (s.startsWith('0',0)) o = s.substring(1);
        return o;
    }
        
    function reset() {
        telno = '';
        setTelno('');
    }
        
    function saveSettings() {
        for (var i=1; i<4; i++) {
            localStorage['name'+i] = $('#name'+i).val();
            localStorage['telno'+i] = $('#telno'+i).val();
            $('#dial'+i).text($('#name'+i).val());
            $('#dial'+i).attr('href','tel:+49'+removeZero($('#telno'+i).val()));
            if ($('#name'+i).val()>'') {
                $('#dialc'+i).show();
            } else {
                $('#dialc'+i).hide();
            }
        }
    }
        
    function setTelno(n) {
        var telno = n.toString();
        localStorage.telno = telno;
        $('#divtelno').val(telno);
    }
        




