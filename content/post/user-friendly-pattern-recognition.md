+++
title = "User-Friendly Pattern Recognition"
description = "patternflow - a way to train and observe"
tags = [
    "patternflow",
    "machine learning",
    "pattern recognition",
    "project"
]
date = "2017-08-22T14:00:37+02:00"
categories = [
    "Project Presentation"
]
menu = "main"
hidden = true
+++

### Currently, I'm working on an interesting project that started as an internal university internship. Basically, it can be described as pattern recognition as a service.

I was very happy with the project task because even if I'm new to machine learning I'm very interested in it. I also like to build user-friendly applications and play around with some visualizations. So I decided to do it.

## Background

Before we go further, here are some definitions to be sure we have the same ideas in mind.

> A **time series** is a series of data points indexed (or listed or graphed) in time order. Most commonly, a time series is a sequence taken at successive equally spaced points in time, according to [wikipedia](https://en.wikipedia.org/wiki/Time_series).

In our case it's basically an array of numbers.

![pf01](/blog/img/pf-img-01.png)

We see already at least two or three showy patterns in the chart above. But the goal is that the application is capable of finding these trained patterns. This is basically called **pattern recognition**.

## The problem to solve (at least in future)

The first question which should everyone come in mind is what's the use case, **what's the problem this application tries to solve**.

The use case I got from my advisor comes from his field of work, robotics.
I've heard a lot about that it is very hard and expensive to train robots new tasks in the current industrial world. Often the code is hardcoded for specific tasks and needs to be rewritten every time the robot should perform another task. I have no valid source for this statement but I think it's right.
Therefore it should exist an easier way to train a robot a new task and one requirement for this goal is to observe the behavior of the robot and be able to react to different events and situations.

For example, the robot grips a box and move it to another position. We need a way to detect if the robot misgripped the box or collides with something based on his sensor data to at least notify a human about his misbehavior. This is even more important if the robot should perform various not hardcoded tasks.
The robot produces a lot of data based on his sensors. This data can be seen as time series with a specific interval between each data tick.

Theoretically there should be a large number of other use cases, immer if pattern ...

## Diving deeper into the challenges

Within the requirements of the internship the application I'll call it **Patternflow** from now on should have the ability:

- to use multiple time series in one graph and combine them in the training set if necessary
- to create different patterns which take as many training sets as the user want
- to display that data in an interactive visualization
- to import data from a file with recorded values from `json` and `csv`
- to let the user select from different algorithms for the metric calculation and the pattern classification
- to reason about the whole graph and find patterns based on a threshold
- to reason about a selected window and find the nearest pattern

I think this list gives a good summary of the features I've implemented during my internship.
If you are more in code that's basically what Patternflow does now:

```javascript
// init
const data = DataImporter('training-record.csv')
const graph = patternflow.graph(data)
graph.render()

// train
graph.addPattern(selection, 'grip')
graph.addPattern(anotherSelection, 'collision')

// reason
const result = patternflow.reason(selection, algorithms)
result.show()
```

Just joking, it's a bit more complex than that, but I hope you got the point.

One challenge was the deep data tree. One instance has n-patterns which have again n-training data sets. Every data set can have multiple dimensions of data as seen in the figure below.

![pf02](/blog/svg/pf-entities.svg)

Unfortunately, the stored data is not in the same structure as the graph nor in the form I'm using to create the distances between data or classifications.

Another problem comes in when I first tested the application with some live data recorded from a robot arm. Even a simple grip produces 2600+ data points for only one dimension of data. Obviously, with that amount of data, there are serious performance issues and I was not able to select the data anymore.
Therefore I needed to smooth and simplify the data points. After a bit of searching I figured out how I can smooth the data with the [Savitzky Golay filter](http://wresch.github.io/2014/06/26/savitzky-golay.html) and simplify the data with the [Ramer Douglas Peuker algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm). With that I was able to transform this graph:

![pf03](/blog/img/pf-img-03.png)

to this graph:

![pf04](/blog/img/pf-img-04.png)

The important point here is to preserve the original structure of the graph to train the patterns correctly.

### Who cares about the technology - TL;TR

The project is written in modern Javascript (ES6+) build on top of [Vue.js](https://vuejs.org/). This allows me to easily bind reactive data to the views which help me a lot to behold the structure of the project.

For the internship, it is only a prototype and I decided to focus on the functionality, that's the reason I only created a frontend. The data is stored in a [Vuex](https://vuex.vuejs.org/) store inspired by [Flux](https://facebook.github.io/flux/docs/overview.html). But it isn't so hard to make it persistent though.

I'm using [c3](http://c3js.org/) to generate the chart and interact with it. It's a really awesome library which I would recommend to everyone who needs this sort of visualization.

The prototype of Patternflow calculates the differences between the time series with the [Dynamic Time Warping](https://en.wikipedia.org/wiki/Dynamic_time_warping) algorithm and classify the most likely pattern with the k-nearest neighbor algorithm, but it is possible to select and specify other algorithms.

## Vision

I could imagine to work further on this project. I think it is a really interesting topic and there are thousends of open tasks.

One important thing is to implement an interface to analyze live data (send per websocket)

With that there comes a tradeoff that the machine learning algorithms like the
- todo python server for machine learning
- nuxtjs frontend

That's currently the vision of patternflow. It uses recorded example data of different robot scenarios and train them to specific patterns. For example the robot grips something successfully or he has a collision with a wall. (Umso öfter man verschiedene szenarios antrainiert, umso genauer die aussage).
After you trained the patterns you can connect the live data from the robot (via websocket) with patternflow and get notified about the events the robot is doing.

nuxt js port, live data
refactoring, ux improvement
