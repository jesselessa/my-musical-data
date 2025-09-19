/*
 * === Middleware checking for the Authorization header ===
 * Meant to ensure the token is present before
 * making any calls to Spotify API
 */

import express from "express";

export const checkAuthHeader = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }
  req.token = authorization; // Stores token for the next functions
  next();
};
