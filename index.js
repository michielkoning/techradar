import contentstack from "contentstack";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

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

const Query = Stack.ContentType("blips").Query();
Query.toJSON()
  .find()
  .then(
    function success(result) {
      const entries = result[0];
      const blips = entries.map((entry) => {
        const { title, description, ring, quadrant, is_new } = entry;
        return {
          name: title,
          description,
          ring,
          quadrant,
          isNew: is_new,
        };
      });
      const radar = {
        title: "Valtech Frontend Tech Radar",
        blips,
        quadrants: getUniqueProperties(blips, "quadrant"),
        rings: getUniqueProperties(blips, "ring"),
      };
      fs.writeFile("./radar.json", JSON.stringify(radar), (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    },
    function error(err) {
      // err object
    }
  );
