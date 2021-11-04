import contentstack from "contentstack";
import fs from "fs";
import dotenv from "dotenv";
import csvWriter from "csv-writer";

dotenv.config();

const header = [
  {
    id: "name",
    title: "name",
  },
  {
    id: "ring",
    title: "ring",
  },
  {
    id: "quadrant",
    title: "quadrant",
  },
  {
    id: "isNew",
    title: "isNew",
  },
  {
    id: "description",
    title: "description",
  },
];

const Stack = contentstack.Stack(
  process.env.CONTENTSTACK_API_KEY,
  process.env.CONTENTSTACK_DELIVERY_TOKEN,
  "production"
);

const getUniqueProperties = (list, identifier) => {
  return list
    .map((listItem) => listItem[identifier])
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, []);
};

var dir = "./dist";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const Query = Stack.ContentType("blip").Query();
Query.toJSON()
  .find()
  .then(
    function success(result) {
      const entries = result[0];
      const blips = entries.map((entry) => {
        const { title, description, ring, quadrant, is_new } = entry;
        return {
          name: title,
          ring,
          quadrant,
          isNew: is_new ? "TRUE" : "FALSE",
          description: description ? description : "-",
        };
      });

      csvWriter
        .createObjectCsvWriter({
          path: "./dist/radar.csv",
          header,
        })
        .writeRecords(blips) // returns a promise
        .then(() => {
          console.log("...Done");
        });
    },
    function error(err) {
      // err object
    }
  );
