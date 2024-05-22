const eventModel = require('./models/Event');
const faker = require('faker');
const mongoose = require('mongoose');
const db = require('./configs/mongoCongig.json');

const CONFIG = db[process.env.NODE_ENV || "development"];
const url = `mongodb://${CONFIG.host}:${CONFIG.port}/${CONFIG.database}`;

mongoose.connect(url)
.catch((error)=>{
  console.log(`Mongo connection failed with error: ${error.message}`);
  process.exit(1);
});


const generateEvents = (num) => {
  const event = [];

  for (let i = 0; i < num; i++) {    
    const title = faker.name.title();
    const description = faker.lorem.sentence(10);
    const eventDate = faker.date.past();
    const organizer = faker.name.lastName();

    event.push({
      title,
      description,
      eventDate,
      organizer
    });
  }

  return event;
};

const eventArray = generateEvents(20);

eventModel.insertMany(eventArray)
  .then(docs => {
    console.log(`${docs.length} events have been inserted into the database.`);
    process.exit(1);
  })
  .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
    process.exit(1);
  });