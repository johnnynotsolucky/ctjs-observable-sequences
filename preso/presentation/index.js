// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Layout,
  Link,
  ListItem,
  List,
  Notes,
  Quote,
  Slide,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Observable Sequences
          </Heading>
          <Heading size={4}  caps lineHeight={1} textColor="tertiary">
            An introduction
          </Heading>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={2} caps lineHeight={1} textColor="secondary">
            Introductions
          </Heading>
          <List>
            <ListItem>@tyronetudehope</ListItem>
            <ListItem>Dev @ Continuon</ListItem>
            <ListItem>Interested in FRP</ListItem>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Observable Sequences?
          </Heading>
          <List>
            <Appear>
              <ListItem>A sequence of ongoing events ordered in time - Andre Staltz</ListItem>
            </Appear>
            <Appear>
              <ListItem>Henceforth, Event Streams</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="tertiary">
          <Notes>
            <ul>
              <li>Why use streams?</li>
              <li>Great, because async programming is hard</li>
              <li>Declaritive means we can focus on what, not how</li>
              <li>Create new streams; just add transformations</li>
            </ul>
          </Notes>
          <Text bold textColor="primary">
            React to events asynchronously in a declarative and composable manner
          </Text>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Notes>
            <ul>
              <li>Producer adds events onto a stream</li>
              <li>E.g. adding a listener to an EventEmitter instance</li>
              <li>Define transformations to apply (mapReduce)</li>
              <li>Do something with the data</li>
            </ul>
          </Notes>
          <Heading fit caps lineHeight={1} textColor="secondary">
            Working w/ Streams
          </Heading>
          <List>
            <Appear>
              <ListItem>Define a producer</ListItem>
            </Appear>
            <Appear>
              <ListItem>Add some operations</ListItem>
            </Appear>
            <Appear>
              <ListItem>Subscribe</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Notes>
            <ul>
              <li>Anything and everything can be modelled onto a stream</li>
              <li>onClick events</li>
              <li>Events from FS updates</li>
              <li>Nothing: Streams that never emit an event</li>
            </ul>
          </Notes>
          <Heading fit caps lineHeight={1} textColor="secondary">
            Where Can They Be Used?
          </Heading>
          <List>
            <Appear>
              <ListItem bold italics>Everywhere!</ListItem>
            </Appear>
            <Appear>
              <ListItem>User interactions</ListItem>
            </Appear>
            <Appear>
              <ListItem>FS events</ListItem>
            </Appear>
            <Appear>
              <ListItem>Arrays</ListItem>
            </Appear>
            <Appear>
              <ListItem>Single value</ListItem>
            </Appear>
            <Appear>
              <ListItem>Nothing</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="tertiary">
          <Notes>
            <ul><li>Lets build a small game</li></ul>
          </Notes>
          <Heading fit caps textColor="primary">
            Cats and Dogs
          </Heading>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Operators
          </Heading>
          <List>
            <Appear>
              <ListItem>Transform the stream to emit a new sequence of events</ListItem>
            </Appear>
            <Appear>
              <ListItem>Akin to prototype methods of an Array object</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Map
          </Heading>
          <List>
            <Appear>
              <ListItem>Similar to Array.prototype.map</ListItem>
            </Appear>
            <Appear>
              <ListItem>Transforms values through a transformation function</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Click Coordinates
          </Heading>
          <Layout>
            <Fill>
              <CodePane textSize={20}
                lang="js"
                source={require("raw-loader!../assets/map.example")}
                margin="20px auto"
              />
            </Fill>
          </Layout>
          <Link href='http://localhost:8086' textColor="tertiary" target="_blank">Example</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Filter
          </Heading>
          <List>
            <Appear>
              <ListItem>Similar to Array.prototype.filter</ListItem>
            </Appear>
            <Appear>
              <ListItem>Values passed to a predicate</ListItem>
            </Appear>
            <Appear>
              <ListItem>Only emits values where the function returns true</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Outside of Bounds
          </Heading>
          <Layout>
            <Fill>
              <CodePane textSize={20}
                lang="js"
                source={require("raw-loader!../assets/filter.example")}
                margin="20px auto"
              />
            </Fill>
          </Layout>
          <Link href='http://localhost:8081' textColor="tertiary" target="_blank">Example</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Create
          </Heading>
          <List>
            <Appear>
              <ListItem>Given some producer, create a stream</ListItem>
            </Appear>
            <Appear>
              <ListItem>Handles putting events onto the stream</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Viewport
          </Heading>
          <Layout>
            <Fill>
              <CodePane textSize={20}
                lang="js"
                source={require("raw-loader!../assets/create.example")}
                margin="20px auto"
              />
            </Fill>
          </Layout>
          <Link href='http://localhost:8082' textColor="tertiary" target="_blank">Example</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Combine (CombineLatest)
          </Heading>
          <List>
            <Appear>
              <ListItem>Merges two or more streams</ListItem>
            </Appear>
            <Appear>
              <ListItem>Emits latest events from each stream together</ListItem>
            </Appear>
            <Appear>
              <ListItem>xstream emits an array</ListItem>
            </Appear>
            <Appear>
              <ListItem>RxJS lets you optionally specify a transformation</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Click Below Middle
          </Heading>
          <Layout>
            <Fill>
              <CodePane textSize={20}
                lang="js"
                source={require("raw-loader!../assets/combine.example")}
                margin="20px auto"
              />
            </Fill>
          </Layout>
          <Link href='http://localhost:8083' textColor="tertiary" target="_blank">Example</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Merge
          </Heading>
          <List>
            <Appear>
              <ListItem>Emit values concurrently from multiple streams</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Getting Direction
          </Heading>
          <Layout>
            <Fill>
              <CodePane textSize={20}
                lang="js"
                source={require("raw-loader!../assets/merge.example")}
                margin="20px auto"
              />
            </Fill>
          </Layout>
          <Link href='http://localhost:8085' textColor="tertiary" target="_blank">Example</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Reduce/Scan/Fold
          </Heading>
          <List>
            <Appear>
              <ListItem>Similar to Array.prototype.reduce</ListItem>
            </Appear>
            <Appear>
              <ListItem>Combines emitted values using an accumulator function</ListItem>
            </Appear>
            <Appear>
              <ListItem>Emits the results of the accumulator</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Changing Lanes
          </Heading>
          <Layout>
            <Fill>
              <CodePane textSize={20}
                lang="js"
                source={require("raw-loader!../assets/fold.example")}
                margin="20px auto"
              />
            </Fill>
          </Layout>
          <Link href='http://localhost:8084' textColor="tertiary" target="_blank">Example</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Challenges
          </Heading>
          <List>
            <Appear>
              <ListItem>Restrict user movement to 500ms intervals</ListItem>
            </Appear>
            <Appear>
              <ListItem>sampleCombine/withLatestFrom</ListItem>
            </Appear>
            <Appear>
              <ListItem>Used a sync$ to control events emitted by both player and enemies</ListItem>
            </Appear>
          </List>
        </Slide>
        <Slide transition={["zoom"]} bgColor="tertiary">
          <Heading fit caps lineHeight={1} textColor="primary">
            Let's play a game
          </Heading>
          <Link bold href='http://localhost:8087' textColor="secondary" target="_blank">Cats and Dogs</Link>
        </Slide>
        <Slide transition={["zoom"]} bgColor="primary">
          <Heading fit caps lineHeight={1} textColor="secondary">
            Thank you #CTJS
          </Heading>
          <Heading size={4} caps lineHeight={1} textColor="tertiary">
            AMA
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
