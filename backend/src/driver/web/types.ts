import express from 'express';

export interface Controller {
  router: express.Router;
}
