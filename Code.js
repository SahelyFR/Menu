const SHEET = SpreadsheetApp.getActiveSpreadsheet();

const RECETTES_TAB = SHEET.getSheetByName('Recettes');
const RECETTES = RECETTES_TAB.getDataRange().getValues();

const MENU_TAB = SHEET.getSheetByName('Menu');
const MENU = MENU_TAB.getDataRange().getValues();

//const cache = CACHE_TAB.getRange(2, 1, 1, 3);

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
    RECETTES.forEach(function(row) {
        if(row[0] != ''){
          recetteList.push(row);
        }
    });
    recetteList.splice(0, 1);
    shuffle(recetteList);
    recetteList.splice(0, recetteList.length-nb)
    return recetteList;
}

/* eslint-disable no-unused-vars */
// eslint-disable-next-line require-jsdoc
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