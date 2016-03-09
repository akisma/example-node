// app/model/models.js
var UserMeta = 					require('./User.js'),
    ClientMeta = 				require('./Client.js'),
    WorkoutSessionMeta = 		require('./Session.js'),
    SessionProductSampleMeta = 	require('./Session_product_sample_assoc.js'),
    SampleMeta = 				require('./Sample.js'),
    BiomarkerMeta = 			require('./Sample_biomarker_result.js'),
    connection = 				require('../sequelize.js');

var User = connection.define('login', UserMeta.attributes, UserMeta.options);
var Client = connection.define('user', ClientMeta.attributes, ClientMeta.options);
var WorkoutSession = connection.define('session', WorkoutSessionMeta.attributes, WorkoutSessionMeta.options);
var SessionProductSample = connection.define('session_product_sample_assoc', SessionProductSampleMeta.attributes, SessionProductSampleMeta.options);
var Sample = connection.define('sample', SampleMeta.attributes, SampleMeta.options);
var Biomarker = connection.define('sample_biomarker_result', BiomarkerMeta.attributes, BiomarkerMeta.options);

//typically,

//     AS: defines what the method names in JS will be derived from (otherwise it will be derived from the SQL table name, blech)
//     FOREIGNKEY: defines what field they are linked by in SQL

User.hasOne(Client, { as: 'Client', foreignKey: 'login_id'}); // allows User.getClient(), etc

//a client has many workout sessions
Client.hasMany(WorkoutSession, { as: 'WorkoutSession', foreignKey: 'session_id'});
//a workout session has many entries in the Session Product Sample associating table (this table is a bunch of rows relating data)
WorkoutSession.hasMany(SessionProductSample, { as: 'SessionProductSample', foreignKey: 'session_id' });
//workout sessions belong to Clients
WorkoutSession.belongsTo(Client, { targetKey: 'user_id'});
//the 'session product sample assoc' table associates session_id -> sample_id, so it supports having multiple samples per session_id by having multiple rows per session (one row per sample)
SessionProductSample.hasOne(Sample, { as: 'Sample', foreignKey: 'sample_id' }); // grants getProductSample, setProductSample etc
//a sample may have multiple biomarker results available within it
Sample.hasMany(Biomarker, { as: 'Biomarkers', foreignKey: 'sample_id'});
//saliva samples are categorized by biomarker type, i.e., 'cortisol', 'amylase', etc and have a lookup table for definition
// Biomarker.hasOne(BiomarkerProfile, { as: 'BiomarkerProfile', foreignKey: 'biomarker_id' });

//Sample.hasOne(SampleStorageLocation) (setSampleStorageLocation, getSampleStorageLocation)
//Sample.hasOne(BiomarkerResult) (setBioMarkerResult, getBiomarkerResult)
//BiomarkerResult.hasOne(Biomarker) (setBiomarker, getBiomarker)

//choose what to expose here - not all things will need exposing because of the relationships established above.

module.exports.User = User;
module.exports.Client = Client;
module.exports.WorkoutSession = WorkoutSession;
module.exports.SessionProductSample = SessionProductSample;
module.exports.Sample = Sample;
module.exports.Biomarker = Biomarker;

//this is more robust:
//http://stackoverflow.com/questions/12487416/how-to-organize-a-node-app-that-uses-sequelize