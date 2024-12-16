const express=require("express");
const jwt=require("jsonwebtoken");

function  auth(req,res,next){
    const token=req.headers.token;

    const response=jwt.verify(token,JWT_SECRET);




}