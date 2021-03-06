# cloud-manager
[![Build Status](https://travis-ci.org/mattwcole/cloud-manager.svg?branch=master)](https://travis-ci.org/mattwcole/cloud-manager)

Simple web app written with Node.js, AngularJS and socket.io for managing AWS CloudFormation stacks with Chef. Currently deployed on Heroku at https://dashboard.matt-cole.co.uk. The usefulness of this tool as opposed to using the AWS management console is that when used with [compatible templates](https://github.com/mattwcole/cfn-templates), it automates the process of restoring instance state from snapshots, meaning you can completely delete your stack when you don't need it, and only pay for snapshots of the data volume(s). I use it to spin up TeamCity and ELK stack servers that I don't use often, as well as a MSM managed Minecraft server. Users can log into the app, spin up the stack, enjoy a few hours of gameplay, before deleting it again. It is a very cost effective way of using AWS servers.

