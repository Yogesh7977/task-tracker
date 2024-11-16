import "./App.css";
import AllTasks from "./components/AllTasks";
import TaskProvider from "./context/TaskContext";
import backgroundVideo from '../src/videos/backgroundVideo.mp4'
function App() {
  return (
    <TaskProvider>
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <AllTasks />
    </TaskProvider>
  );
}

export default App;
