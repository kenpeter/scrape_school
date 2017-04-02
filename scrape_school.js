const osmosis = require('osmosis');
const Promise = require('bluebird');
const axios = require('axios');

var SchoolDAO = require('./model/school');
const schoolDAO = new SchoolDAO();

const theBaseList = 'http://www.topscores.info/report.php?z=Vic&req=vce-school-rank-median-vce&year=2016&sortBy=n10&pageno=';
//const theListLength = 26;
const theListLength = 2;
let listArr = [];
let schoolArr = [];

function genEachPage(theBaseList, theListLength) {
  const theReturn = [];
  for(var i=1; i<=theListLength; i++) {
    let page = theBaseList + i;
    theReturn.push(page);
  }

  return theReturn;
}


listArr = genEachPage(theBaseList, theListLength);


function buildArr() {
  return Promise.each(listArr, (list) => {
    return new Promise((resolve, reject) => {

      osmosis
        .get(list)
        .set({
          // It seems very smart, it is able to grab the text
          'row': ['table#resultsTable > tbody > tr'],
        })
        .data((mydata) => {
          //console.log(mydata);

          let tmpArr = mydata.row;
          for(let i=0; i<tmpArr.length; i++) {
            let row = tmpArr[i];
            let tmpArr1 = row.split('\n');

            let index = tmpArr1[0];
            let schoolName = tmpArr1[1];
            let location = tmpArr1[2];
            let medianScore = tmpArr1[3];
            let top40 = tmpArr1[4];

            let obj = {
              index: index,
              schoolName: schoolName,
              location: location,
              medianScore: medianScore,
              top40: top40
            }

            schoolArr.push(obj);
            /*
            console.log('-- one --');
            console.log(index);
            console.log(schoolName);
            console.log(location);
            console.log(medianScore);
            console.log(top40);
            */
          }

          resolve();
        })
        .error((err) => {
          console.error(err);
          reject();
        });

    });
  });

}

// Run
schoolDAO
  .delete()
  .then(() => {
    return buildArr();
  })
  .then(() => {
    console.log('---- all done ----');
    console.log(schoolArr);
    process.exit(0);
  });
