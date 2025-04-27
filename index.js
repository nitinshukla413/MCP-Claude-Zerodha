const { placeOrder } = require("./trade");

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Stock Trader",
  version: "1.0.0"
});


server.tool("buy-stock",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "CNC", "tag", "MARKET");
    return {
      content: [{ type: "text", text: `Bought ${quantity} shares of ${stock}` }]
    }
  }
);

server.tool("sell-stock",
    { stock: z.string(), quantity: z.number() },
    async ({ stock, quantity }) => {
      placeOrder(stock, quantity, "CNC", "tag", "MARKET");
      return {
        content: [{ type: "text", text: `Sold ${quantity} shares of ${stock}` }]
      }
    }
  );
  



server.resource("factorial",
  new ResourceTemplate("factorial://{a}", { list: undefined }),
  async (uri, { a }) => ({
    contents: [{ uri: uri.href, text: String(a) }]
  })
);


const transport = new StdioServerTransport();
await server.connect(transport);
