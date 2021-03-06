var mongodb = require('./connect');

var Schema = mongodb.mongoose.Schema;

var SchoolSchema = new Schema({
  index: Number,
  schoolName: String,
  latLng: { lat: Number, lng: Number},
  location: String,

  medianScore: Number,
  top40: Number,
  year: Number,
  
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
});

var SchoolDAO = function(){};
var School = mongodb.mongoose.model('School', SchoolSchema);

SchoolDAO.prototype =  {
  constructor: SchoolDAO,

  save: function(obj){
    return new Promise((resolve, reject) => {
      var instance = new School(obj);
        instance.save((err) => {
          if(err) return reject(err);
          resolve();
        });
      });
    },

  delete: function(query) {
    return new Promise((resolve, reject) => {
      School.remove(query, (err, data) => {
        if(err) return reject(err);
        resolve(data);
      });
    });
  }

}

module.exports = SchoolDAO;
