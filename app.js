//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "What do Albert Einstein, Marie Curie, Frida Kahlo, Leonardo da Vinci, and Frederick Douglass all have in common? Each of these famous figures kept a journal or diary to record their experiences, thoughts, or feelings. Kahlo and da Vinci even used illustrations to express emotions and sketch out ideas.";
const aboutContent = "Whether you’re looking for a tool to record your daily emotions and activities in a reflective journal, keep track of milestones in a food diary or pregnancy journal, or even record your dreams in a dream journal, our site has you covered.";
const contactContent = "You can contact us.";

const app = express();

var _ = require('lodash');

let posts=[];

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{parag:homeStartingContent,posts:posts});
});

app.get("/contact",function(req,res){
  res.render("contact",{pr:contactContent});
});

app.get("/about",function(req,res){
  res.render("about",{par:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:blog",function(req,res){
  const requestdTitle = _.lowerCase(req.params.blog);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.ptitle);
    if (storedTitle===requestdTitle) {
      res.render("post",{tit:post.ptitle,bod:post.pbody});
    } 
  })

});

app.post("/compose",function(req,res){
  const post={
    ptitle:req.body.posttitle,
    pbody:req.body.postbody
  };
  posts.push(post);
  res.redirect("/");
})











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
