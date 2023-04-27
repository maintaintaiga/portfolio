import { RequestHandler } from "express";

const csrfInit: RequestHandler = async (req, res) => {
  res.end();
};

export { csrfInit };
