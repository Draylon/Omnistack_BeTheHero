const xprss = require("express");
const routes = require("./src/routes")
const cors = require("cors")

const app = xprss();

app.use(cors());
app.use(xprss.json());
app.use(routes);


app.listen(3333);

//https://www.notion.so/Configura-o-e-conceitos-do-React-2e8d0b4079e749baa51b834e10935cc0

