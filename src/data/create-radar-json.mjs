import Contentstack from "contentstack";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: "production",
});

const getUniqueProperties = (list, identifier) => {
  return list
    .map((listItem) => listItem[identifier])
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, [])
    .sort();
};

const Query = Stack.ContentType("blip").Query();
Query.toJSON()
  .find()
  .then(
    function success(result) {
      const entries = result[0];
      const blips = entries.map((entry) => {
        const {
          title,
          description,
          ring,
          quadrant,
          url,
          is_new,
          history,
          comments,
        } = entry;
        return {
          name: title,
          description,
          url,
          status: ring,
          category: quadrant,
          isNew: is_new,
          history,
          comments,
        };
      });
      const radar = {
        title: "Valtech Frontend Tech Radar",
        blips,
        categories: getUniqueProperties(blips, "category"),
        statuses: getUniqueProperties(blips, "status"),
      };
      fs.writeFile("./src/data/radar.json", JSON.stringify(radar), (err) => {
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
