var mySeason = 0;

const SHEET = SpreadsheetApp.getActiveSpreadsheet();

const RECETTES_TAB = SHEET.getSheetByName('Recettes');
const PARAMS_TAB = SHEET.getSheetByName('Params');
const RECETTES = RECETTES_TAB.getDataRange().getValues();

const MENU_TAB = SHEET.getSheetByName('Menu');
const MENU = MENU_TAB.getDataRange().getValues();

const MY_SEASON = PARAMS_TAB.getRange(1,2);

const PRINTEMPS = 80;
const ETE = 172;
const AUTOMNE = 264;
const HIVER = 359;

//PropertiesService.getScriptProperties().setProperty('SEASON', '');


function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function retrieveRecipes(nb){
    const recetteList = [];
    var seasonRecipes = RECETTES.filter(filtreSaison);
    //Logger.log(seasonRecipes)
    seasonRecipes.forEach(function(row) {
        if(row[0] != ''){
          recetteList.push(row);
        }
    });
    
    recetteList.splice(0, 1);
    Logger.log(recetteList)
    return shuffle(recetteList);
}

function determineSeason(){
  var currentDay = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "DD");
  //var SEASON = "";
  if(currentDay >= PRINTEMPS && currentDay < ETE){
    mySeason = 1;
  }
  if(currentDay >= ETE && currentDay < AUTOMNE){
    mySeason = 2;
  }
  if(currentDay >= AUTOMNE && currentDay < HIVER){
    mySeason = 3;
  }
  if(currentDay >= HIVER || currentDay < PRINTEMPS){
    mySeason = 4;
  }
  MY_SEASON.setValue(mySeason);
}

function getSeason(){
  return MY_SEASON.getValue();
}

function filtreSaison(arr){ 
  // +2 for 2 columns before start of seasons in recettes tab
  return arr[MY_SEASON.getValue()+2] === true;
}

function doGet() {
    'use strict';
    const html = HtmlService.createTemplateFromFile('Front').evaluate();
    html.setTitle('Menu Hebdo');
    return html;
  }
  
  /**
   * Templating function
   * @param {string} filename name of the file to include inside the template
   * @return {string} complete HTML display from split files
   * (Front, FrontScripts, Stylesheet, Utilities, Classes, Code)
   */
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }