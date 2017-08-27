+++
title = "User-Friendly Pattern Recognition"
description = "patternflow - a way to train and observe"
tags = [
    "patternflow",
    "machine learning",
    "pattern recognition"
]
date = "2017-08-22"
categories = [
    "Meta"
]
menu = "main"
hidden = true
+++

### Currently, I'm working on an interesting project based on a university course. It should answer the question if it is possible to combine a good user experience with pattern recognition on n-dimensional time series.


## Background

Before I start with the project I want to write a bit about the definitions.

#### Time series

> A time series is a series of data points indexed (or listed or graphed) in time order. Most commonly, a time series is a sequence taken at successive equally spaced points in time. (according to [wikipedia](https://en.wikipedia.org/wiki/Time_series))

In our case

#### Pattern Recognition

> Pattern recognition is technique in machine learning to...



## Why I'm doing this

The application should be capable of taking n series of data, learning patterns from the structure and later predict a pattern on the whole data.
But this is a way too abstract case so for a better understanding i got the following use case.

I've heard a lot about that it is very hard to train robots in industry new task. Often they are used for one specific task and if they should do something else a lot of code is rewritten.
Therefore it should be exists a better way to train a robot a new task. And therefore we need a way to observe the behaviour of the robot to prevent him from destroying everything.
The robot produces a lot of data based on his sensors. These data can be seen as time series with a specific interval between each data tick.

That's currently the vision of patternflow. It uses recorded example data of different robot scenarios and train them to specific patterns. For example the robot grips something successfully or he has a collision with a wall. (Umso öfter man verschiedene szenarios antrainiert, umso genauer die aussage).
After you trained the patterns you can connect the live data from the robot (via websocket) with patternflow and get notified about the events the robot is doing.

## What technologies I'm using

- select n-dim data
- import data / smooth / simplify data
- visualization
- algo selection


I'm just not doing more than that:

```javascript
// init
const data = Importer(data)
const graph = patternflow.graph(data)
graph.render()

// train
graph.addPattern(4, 50, 'grip')
graph.addPattern(60, 73, 'collision')

// reason
const result = patternflow.reason(data)
result.show()
```
