 //import company from './company.json';
(function($) {
  'use strict';

  var get = new XMLHttpRequest();
        get.open('GET', 'http://localhost:3000/car');
        get.send();

  var post = new XMLHttpRequest();
        post.open('POST', 'http://localhost:3000/car');
        post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        post.send('image=https://www.socarrao.com.br/img/home/category1.jpg&brandModel=abcd&year=1995&plate=abds&color=preto');

        console.log('Cadastrando o usuário...');
        post.onreadystatechange = function() {
          if(post.readyState === 4) {
            console.log('Usuário Cadastrado!', post.responseText);
          }
        };

  var app = (function appControler() {
    return {
      init: function init() {
        console.log('app init');
        this.companyInfo();
        this.initEvents();
        //this.removeCar();
        
      },

      initEvents: function initEvents(){ 
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        console.log('submit');
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app.createNewCar());
      },
      
      createNewCar: function createNewCar() {
        /**/
          
        var $fragment = document.createDocumentFragment();
        var $tr = document.createElement('tr');
        var $tdImage = document.createElement('td');
        var $image = document.createElement('img');
        var $tdBrand = document.createElement('td');
        var $tdYear = document.createElement('td');
        var $tdPlate = document.createElement('td');
        var $tdColor = document.createElement('td');
        var $tdOpcao = document.createElement('td');
        var $_remove = document.createElement('button');

        $image.setAttribute('src', $('[data-js="image"]').get().value);
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="brand-model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;
        
        $tdOpcao.appendChild($_remove);
        $_remove.innerHTML = 'Remover';
        $_remove.setAttribute('data-js', 'remove'/*$('[data-js="remove"]').get().value*/);
        $_remove.addEventListener('click', function (){
          $tr.removeChild($tdBrand);
          $tr.removeChild($tdImage);
          $tr.removeChild($tdYear);
          $tr.removeChild($tdPlate);
          $tr.removeChild($tdColor);
          $tr.removeChild($tdOpcao);
        }, false);

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdOpcao);
        

        return $fragment.appendChild($tr);
      },
      
      /*removeCar: function removeCar() {
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.removeChild(app.createNewCar());
      },*/
      

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if(!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName =  $('[data-js="company-name"]').get();
        var $companyPhone =  $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();

  app.init();

  /*var obj = {
    lala: 'oi',
    init: function() {
      return this.lala;
    }
  };
  console.log(obj.init())*/

})(window.DOM);
