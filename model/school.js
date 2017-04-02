var mongodb = require('./connect');

var Schema = mongodb.mongoose.Schema;

var SchoolSchema = new Schema({
  name: String,
  location: String,
  locationCoord: { lat: Number, lng: Number},
  medianScore: Number,
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
      SchoolDAO.remove(query, (err, data) => {
        if(err) return reject(err);
        resolve(data);
      });
    });
  }

}

module.exports = SchoolDAO;
