import "./App.css";
import PhotoStack from "./components/PhotoStack";

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
