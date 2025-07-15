import "dotenv/config";
import knexInstance from "./database.js";
import express from "express";
import { queryValidator } from "./validateschema.js";
import { sortValidator } from "./sortschema.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiRouter = express.Router();
app.use("/api", apiRouter);

const contactsAPIRouter = express.Router();
apiRouter.use("/contacts", contactsAPIRouter);

contactsAPIRouter.get("/", queryValidator(sortValidator), async (req, res) => {
  let query = knexInstance.select("*").from("contacts");

  const { sort, direction } = req.validatedQuery;

  if (sort && direction) {
    query = query.orderBy(sort, direction);
  }

  try {
    const data = await query;
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
