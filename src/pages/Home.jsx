import Spinner from '../ui/Spinner';

function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center gap-6 py-12">
      <h1 className="text-5xl">IN PROGRESS</h1>
      <ul className="list-disc">
        <li>Finish homepage</li>
        <li>Refactor layout for media queries</li>
      </ul>
      <div>
        <Spinner />
      </div>
    </div>
  );
}

export default Home;
