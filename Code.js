let currentSeason = 0;

const SHEET = SpreadsheetApp.getActiveSpreadsheet();
const RECETTES_TAB = SHEET.getSheetByName('Recettes');
const RECETTES = RECETTES_TAB.getDataRange().getValues();

const PRINTEMPS = 80;
const ETE = 172;
const AUTOMNE = 264;
const HIVER = 359;

const MY_SEASON = parseInt(PropertiesService.getScriptProperties().getProperty('season'));

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  Logger.log(array);
  return array;
}

function retrieveRecipes(nb){
    const recetteList = [];
    let seasonRecipes = RECETTES.filter(filtreSaison);
    
    seasonRecipes.forEach(function(row) {
        if(row[0] != ''){
          recetteList.push(row);
        }
    });
    
    recetteList.splice(0, 1);
    
    return shuffle(recetteList);
}

function determineSeason(){
  let currentDay = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "DD");
  
  if(currentDay >= PRINTEMPS && currentDay < ETE){
    currentSeason = 1;
  }
  if(currentDay >= ETE && currentDay < AUTOMNE){
    currentSeason = 2;
  }
  if(currentDay >= AUTOMNE && currentDay < HIVER){
    currentSeason = 3;
  }
  if(currentDay >= HIVER || currentDay < PRINTEMPS){
    currentSeason = 4;
  }
  PropertiesService.getScriptProperties().setProperty('season', currentSeason);
}

function getSeason(){
  return MY_SEASON;
}

function filtreSaison(arr){ 
  // +2 for 2 columns before start of seasons in recettes tab
  return arr[MY_SEASON+2] === true;
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