import "./App.css";
import PhotoStack from "./components/PhotoStack";
import Slo from "./assets/slo.png";

import { names, stacks } from "./data/stacks";

function getRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

const mappedStacks = stacks.map((stack) => {
  const photos = stack.photos;
  const mappedPhotos = photos.map((photo) => {
    return { text: getRandomName(), url: photo };
  });

  return { ...stack, photos: mappedPhotos.toReversed() };
});

function App() {
  return (
    <div className="app">
      <a className="page-header" href="https://x.com/bodeslomo" target="_blank">
        Polaroid Photos Stack to Grid Interaction by <img src={Slo} />
        <span className="slo">Slo</span>
      </a>
      {mappedStacks.map((stack, i) => {
        return (
          <PhotoStack
            photos={stack.photos}
            stackId={`${stack.name}-${i}`}
            stackName={`${stack.name}`}
            key={`${stack.name}-${i}`}
            index={i}
          />
        );
      })}
    </div>
  );
}

export default App;
