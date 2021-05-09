import { createServer, Model, RestSerializer } from "miragejs";
import { productsList } from "../data";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },
    models: {
      product: Model,
      cart: Model,
      wishlist: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.resource("products");
    },

    seeds(server) {
      productsList.forEach((product) => {
        server.create("product", {
          ...product,
        });
      });
    },
  });
}
