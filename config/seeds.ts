// force (in case any account is found)

import { Seeder } from "mongo-seeding";
import * as path from "path";
import commonConfig from "./db";

const seeder = new Seeder({
  database: `${commonConfig.mongoUri}/${commonConfig.mongoDbName}`,
  dropDatabase: true,
});

const collections = seeder.readCollectionsFromPath(
  path.resolve("./modules/common/seeds"),
  {
    extensions: ["ts"],
    transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
  }
);

seeder
  .import(collections)
  .then(() => {
    console.log(collections);
    console.log("Success");
  })
  .catch((err) => {
    console.log("Error", err);
  });
